import React from "react";
import { ReactTyped as Typed } from "react-typed";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="text-white">
      <div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
        <p className="text-[#00df9a] text-xl font-bold p-2">
          Empowering Farmers
        </p>
        <h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-2">
          Grow With Us
        </h1>
        <div className="flex justify-center items-center">
          <p className="md:text-4xl sm:text-4xl text-xl font-bold py-4">
            One Stop Hub for
          </p>
          <Typed
            className="md:text-5xl sm:text-2xl text-xl font-bold md:pl-4 pl-2"
            strings={["SOLUTION", "PREDICTION", "RECOMMENDATION"]}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className="md:text-2xl text-xl font-bold text-gray-500 mt-2">
          Harnessing Data Analytics for Crop Prices, Soil Insights, and Seamless Agri-eCommerce Growth
        </p>
        <button className="bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black">
          <Link to="/resources">Get Started</Link>
        </button>
      </div>
    </div>
  );
};

export default Hero;
