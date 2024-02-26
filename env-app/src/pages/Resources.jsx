import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Resources() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // const [soil, setSoil] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [rainfall, setRainfall] = useState(null);
  const [arrivalDate, setArrivalDate] = useState(null);
  const [tavg, setTavg] = useState(null);
  const [prcp, setPrcp] = useState(null);

  const [result, setResult] = useState(null);
  const [fruit, setFruit] = useState(null);
  const [predict, setPredict] = useState(null);
  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    setSelectedFile(e.dataTransfer.files[0]);
    setPreviewImage(URL.createObjectURL(e.dataTransfer.files[0]));
  };
  const handleSoilSubmit = () => {
    const formdata = new FormData();
    formdata.append('file', selectedFile, 'soil.jpeg');
    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch('http://localhost:8080/predict2', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setResult(result);
        console.log('result: ', result);
      })
      .catch((error) => console.error(error));
  };

  const handleFruitSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      temperature: temperature,
      humidity: humidity,
      rainfall: rainfall,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:8080/predict', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setFruit(result);
        console.log('result: ', result);
      })
      .catch((error) => console.error(error));
  };
  const handlePredSubmit = () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      arrival_date: arrivalDate,
      tavg: tavg,
      prcp: prcp,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:8080/predict1', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setPredict(result);
        console.log('result: ', result);
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      <Navbar />
      <div className="w-full min-h-screen py-10 px-10 bg-white">
        <p className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-[#00df9a] flex justify-center items-center">
          Upload an Image to Begin
        </p>
        <div className="flex flex-col items-center mt-20">
          <div
            onDragOver={onDragOver}
            onDrop={onDrop}
            className="border border-[#00df9a] p-2 rounded-md mb-6 w-64 h-64 flex items-center justify-center text-gray-500 bg-white relative"
          >
            {selectedFile ? (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-full object-contain"
              />
            ) : (
              <>
                <span className="absolute top-2 left-2">
                  Drag and drop an image here
                </span>
                <input
                  type="file"
                  onChange={(e) => {
                    setSelectedFile(e.target.files[0]);
                    setPreviewImage(URL.createObjectURL(e.target.files[0]));
                  }}
                  className="absolute bottom-2 left-2"
                />
              </>
            )}
          </div>
          <button
            // type="submit"
            onClick={handleSoilSubmit}
            className="bg-[#00df9a] w-[200px] rounded-md font-medium py-3 text-black"
          >
            Submit
          </button>
          {result ? (
            <div className="mt-10">
              <p className="text-[#00df9a] text-xl font-bold">Results</p>
              <p>{result}</p>
            </div>
          ) : (
            <div>
              <p className="text-[#00df9a] text-xl font-bold">Results</p>
              <p>Results will appear here</p>
            </div>
          )}
        </div>
        {/* # form to input temperature , humidity and rainfall and call the api */}
        <div className="flex flex-col items-center mt-20">
          <div className="border border-[#00df9a] p-2 rounded-md mb-6 w-4/5 h-64 flex items-center justify-center text-gray-500 bg-white relative">
            <span className="absolute top-2 left-2">
              Enter Temperature, Humidity and Rainfall
            </span>
            <input
              type="number"
              placeholder="Temperature"
              onChange={(e) => setTemperature(e.target.value)}
              className="absolute top-10 left-2"
            />
            <input
              type="number"
              placeholder="Humidity"
              onChange={(e) => setHumidity(e.target.value)}
              className="absolute top-20 left-2"
            />
            <input
              type="number"
              placeholder="Rainfall"
              onChange={(e) => setRainfall(e.target.value)}
              className="absolute top-30 left-2"
            />
          </div>
          <button
            onClick={handleFruitSubmit}
            className="bg-[#00df9a] w-[200px] rounded-md font-medium py-3 text-black"
          >
            Submit
          </button>
          {/* # display result here, same as above One */}
          {fruit ? (
            <div className="mt-10">
              <p className="text-[#00df9a] text-xl font-bold">Results</p>
              <p>{fruit}</p>
            </div>
          ) : (
            <div>
              <p className="text-[#00df9a] text-xl font-bold">Results</p>
              <p>Results will appear here</p>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center mt-20">
          <div className="border border-[#00df9a] p-2 rounded-md mb-6  w-4/5 h-64 flex items-center justify-center text-gray-500 bg-white relative">
            <span className="absolute top-2 left-2">
              Enter Arrival Date, Temperature and Precipitation
            </span>
            <input
              type="number"
              placeholder="Arrival Date"
              onChange={(e) => setArrivalDate(e.target.value)}
              className="absolute top-10 left-2"
            />
            <input
              type="number"
              placeholder="Temperature"
              onChange={(e) => setTavg(e.target.value)}
              className="absolute top-20 left-2"
            />
            <input
              type="number"
              placeholder="Precipitation"
              onChange={(e) => setPrcp(e.target.value)}
              className="absolute top-30 left-2"
            />
          </div>
          <button
            onClick={handlePredSubmit}
            className="bg-[#00df9a] w-[200px] rounded-md font-medium py-3 text-black"
          >
            Submit
          </button>
          {/* # display result here, same as above One */}
          {predict ? (
            <div className="mt-10">
              <p className="text-[#00df9a] text-xl font-bold">Results</p>
              <p>{predict}</p>
            </div>
          ) : (
            <div>
              <p className="text-[#00df9a] text-xl font-bold">Results</p>
              <p>Results will appear here</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Resources;