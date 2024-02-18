import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Resources() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    setSelectedFile(e.dataTransfer.files[0]);
    setPreviewImage(URL.createObjectURL(e.dataTransfer.files[0]));
  };

  return (
    <div>
      <Navbar />
      <div className="w-full min-h-screen py-10 px-10 bg-white">
        <p className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-[#00df9a] flex justify-center items-center">Upload an Image to Begin</p>
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
                <span className="absolute top-2 left-2">Drag and drop an image here</span>
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
            type="submit"
            className="bg-[#00df9a] w-[200px] rounded-md font-medium py-3 text-black"
          >
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Resources;