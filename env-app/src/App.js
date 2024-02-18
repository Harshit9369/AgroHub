import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Resources from "./pages/Resources";
import Api from "./pages/Api";
import WeatherApi from "./pages/WeatherApi";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="resources" element={<Resources />} />
        <Route path="contact" element={<Contact />} />
        <Route path="/Api" element={<Api />} />
        <Route path="/WeatherApi" element={<WeatherApi />} />
      </Routes>
    </Router>
  );
}

export default App; 