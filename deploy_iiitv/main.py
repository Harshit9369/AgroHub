import os
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'  # Force TensorFlow to use CPU
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'  # Disable oneDNN custom operations

import uvicorn 
from fastapi import FastAPI
from Features import BankNote
from Features import Wheat
import numpy as np
import pickle
import pandas as pd
from fastapi.responses import JSONResponse
import joblib
import tensorflow as tf
from fastapi import File, UploadFile, HTTPException

import cv2
import base64
import numpy as np
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
pickle_in = open("data_files/crop_recom_using_weather.pkl", "rb")
classifier = pickle.load(pickle_in)

pickle_in_2 = open("data_files/wheat_msp.pkl", "rb")
regress = pickle.load(pickle_in_2)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cnn_model = tf.keras.models.load_model("data_files/cnn.h5")
classes = ['Alluvial Soil', 'Black Soil', 'Clay Soil', 'Red Soil']

# Rest of your code remains unchanged

@app.get('/')
def index():
    return {'message': 'Hello, World'}

@app.post("/predict")
def predict_crop(data: BankNote):
    data_dict = data.dict()
    temp = data_dict['temperature']
    humid = data_dict['humidity']
    rain = data_dict['rainfall']

    prediction = classifier.predict([[temp, humid, rain]])
    response_content = {'prediction': prediction.tolist()}  
    return JSONResponse(content=response_content)

@app.post("/predict1")
def predict_msp(data: Wheat):
    data_dict = data.dict()
    arrival_date = data_dict['arrival_date']
    tavg = data_dict['tavg']
    prcp = data_dict['prcp']

    prediction = regress.predict([[arrival_date, tavg, prcp]])
    response_content = {'prediction': prediction.tolist()} 
    
    return JSONResponse(content=response_content)

async def validate_image(file: UploadFile):
    if not file:
        raise HTTPException(status_code=400, detail="File is empty")

async def read_image(file: UploadFile):
    contents = await file.read()
    return contents

def convert_to_png(image_data):
    image = cv2.imdecode(np.frombuffer(image_data, np.uint8), cv2.IMREAD_COLOR)
    _, encoded_image = cv2.imencode(".png", image)
    png_base64 = base64.b64encode(encoded_image).decode("utf-8")
    return png_base64

def preprocess_image(png_base64):
    decoded_image = base64.b64decode(png_base64)
    image = cv2.imdecode(np.frombuffer(decoded_image, np.uint8), cv2.IMREAD_COLOR)
    resized_image = cv2.resize(image, (128, 128))
    normalized_image = resized_image / 255.0
    preprocessed_image = np.expand_dims(normalized_image, axis=0)
    return preprocessed_image

@app.post("/predict2")
async def predict_soil(file: UploadFile = File(...)):
    await validate_image(file)
    image_data = await read_image(file)
    png_base64 = convert_to_png(image_data)
    processed_image = preprocess_image(png_base64)

    # Make predictions using the loaded CNN model
    dl_prediction = cnn_model.predict(processed_image)
    
    response_content = {'dl_prediction': dl_prediction.tolist()}
    dl_prediction_array = np.array(dl_prediction)

    max_index = np.argmax(dl_prediction_array)
    
    max_soil_type = classes[max_index]

    response_content = {'dl_prediction': dl_prediction.tolist(), 'max_soil_type': max_soil_type}
    
    return JSONResponse(content=response_content)


if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8080)
