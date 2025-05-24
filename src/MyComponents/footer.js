import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="flex items-center m-2">
        <img src="logo.jpg" className="h-6 w-6 rounded-full ml-3" alt="error" />
        <h1 className="font-bold mx-1">CodeCanvas</h1>
      </div>

      <div className="bg-black text-white flex flex-wrap p-6 justify-between items-center text-color-text babybear:text-xl font-semibold">
        {/* Quick Links Section */}
        <div className="flex flex-col mb-6 w-full md:w-1/3">
          <h1 className="text-xl mb-3">Quick Links:</h1>
          <div className="flex flex-col text-gray-300">
            <Link to="/" className="mb-2">Home</Link>
            <Link to="/about" className="mb-2">About</Link>
            <Link to="/contact" className="mb-2">Contact</Link>
          </div>
        </div>

        {/* Developer Accounts Section */}
        <div className="flex flex-col mb-6 w-full md:w-1/3">
          <h1 className="text-xl mb-3">Developer Accounts:</h1>
          <a href="https://wajihulhasan01.github.io/Portfolio/" target="_blank" className="mb-3">Portfolio</a>
          <div className="flex flex-wrap gap-4">
            <a href="https://github.com/wajihulhasan01" target="_blank">
              <img className="w-9 h-9 m-2 bg-white rounded-full" src="github.png" alt="GitHub" />
            </a>
            <a href="https://www.linkedin.com/in/wajihulhasan01" target="_blank">
              <img className="w-9 h-9 m-2 bg-white rounded-full" src="linkedin.png" alt="Linkedin" />
            </a>
            <a href="https://www.facebook.com/wajihulhasan13" target="_blank">
              <img className="w-9 h-9 m-2 bg-white rounded-full" src="facebook.webp" alt="Facebook" />
            </a>
            <a href="https://x.com/wajihulhasan01?t=EILGSX4YFfbw4ic5DVvRcQ&s=09" target="_blank">
              <img className="w-9 h-9 m-2 bg-white rounded-full" src="image1.jpg" alt="Twitter" />
            </a>
            <a href="https://www.instagram.com/wajihulhasan01" target="_blank">
              <img className="w-9 h-9 m-2 bg-white rounded-full" src="OIP(3).jpg" alt="Instagram" />
            </a>
            <a href="https://wa.me/923292203648" target="_blank">
              <img className="w-9 h-9 m-2 bg-white rounded-full" src="OIP (1).jpg" alt="Whatsapp" />
            </a>
          </div>
        </div>

        {/* Short Bio Section */}
        <div className="w-full md:w-1/3">
          <h1 className="text-xl mb-3">Short Bio:</h1>
          <p className="text-gray-300 mb-3">Built and maintained by <a href="https://wajihulhasan01.github.io/Portfolio/" target="_blank" className="underline">Wajih ul Hasan</a>, Web Developer.</p>
          <p className="text-gray-300">Copyright: © 2025 <a href="https://wajihulhasan01.github.io/Portfolio/" target="_blank" className="underline">Wajih ul Hasan</a>. All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
