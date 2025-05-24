import React, { useState, useEffect } from "react";
import "./Header.css"; 
import { Link } from "react-router-dom";
import { auth, provider } from "../firebase"; // adjust the path if needed
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event) => {
    if (!event.target.closest(".dropdown")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", closeDropdown);
    }
    return () => {
      window.removeEventListener("click", closeDropdown);
    };
  }, [isOpen]);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Signed in user:", user);
      // After successful sign-in, navigate to /blogpost
      navigate("/dashboard");
    } catch (error) {
      console.error("Sign in error:", error.code, error.message);
      alert(`Error: ${error.message}`);
    }
  };
  
const navigate = useNavigate();


  return (
    <nav className="sticky top-0 z-50 text-center flex justify-center  semi-bold bg-blue-600 text-white">
      <div className="border border-white m-7 p-3 rounded-full flex justify-between items-center w-5/6 ">
        <div className="flex items-center">
          {/* Hamburger Menu Icon */}
          <div
            className={`navT ${isOpen ? "active" : ""}`}
            onClick={toggleDropdown}
          >
            <div className="icon"></div>
          </div>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute left-37 top-full w-40 bg-white text-black border rounded-md shadow-lg z-50 dropdown">
<Link to="/" className="block px-4 py-2 hover:bg-gray-100">
  Home
</Link>

<Link to="/about" className="block px-4 py-2 hover:bg-gray-100">
  About
</Link>

<Link to="/contact" className="block px-4 py-2 hover:bg-gray-100">
  Contact
</Link>

            </div>
          )}

          {/* Logo and Title */}
          <div className="flex items-center">
            <img src="logo.jpg" className="h-6 w-6 rounded-full" alt="error" />
            <h1 className="font-bold mx-1">CodeCanvas</h1>
          </div>
        </div>

        {/* Sign-In Button */}
        <button
  onClick={handleGoogleSignIn}
  className="border rounded-full px-3 border-white bg-white text-black transition-transform duration-300 ease-in-out transform hover:scale-110 hover:bg-gray-200"
>
  Sign in
</button>

      </div>
    </nav>
  );
};

export default Header;


