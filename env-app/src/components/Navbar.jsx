import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import logo2 from "../assets/logo2.png";
import marketplaceIcon from "../assets/redirect.png"; // Assuming you have the icon file

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex justify-between items-center h-20 max-w-[1240px] mx-auto px-4 text-white">
      <li className="flex items-center justify-start mx-0 my-0 px-0 py-0 pr-4"> {/* Added pr-4 for right padding */}
        <Link to="/">
          <img src={logo2} alt="logo" className="w-18 h-16" />
        </Link>
      </li>
      <ul className="hidden md:flex items-center text-l space-x-4">
        <li className="p-4">
          <Link to="/">Home</Link>
        </li>
        <li className="pr-0 flex items-center">
          <Link to="https://www.iffcobazar.in/en/agri-machinery/sprayer-pumps">
            Marketplace
          </Link>
          <Link to="https://www.iffcobazar.in/en/agri-machinery/sprayer-pumps">
            <img src={marketplaceIcon} alt="Redirect" className="ml-0 h-5" />
          </Link>
        </li>
        <li className="p-4">
          <Link to="/resources">Resources</Link>
        </li>
        <li className="p-4">
          <Link to="/about">About</Link>
        </li>
        <li className="p-4">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <div onClick={handleNav} className="block md:hidden items-center">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <ul
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">REACT.</h1>
        <li className="p-4 border-b border-gray-600">Home</li>
        <li className="p-4 border-b border-gray-600">Blogs</li>
        <li className="p-4 border-b border-gray-600">Resources</li>
        <li className="p-4 border-b border-gray-600">About</li>
        <li className="p-4">Contact</li>
      </ul>
    </div>
  );
};

export default Navbar;
