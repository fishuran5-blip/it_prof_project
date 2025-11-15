import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import logoUA from "../image/logoUA.png";
import caplogo from "../image/caplogo.png";

const Pagetwo = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleRegisterClick = () => {
    navigate("/registercustomer"); // ✅ Navigate to RegisterCustomer page
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center text-center px-4 pt-8">
      {/* Logo */}
      <div className="w-28 h-28 mx-auto overflow-hidden rounded-2xl bg-white flex items-center justify-center mb-8 shadow-lg">
        <img
          src={logoUA}
          alt="Under Armour Logo"
          className="object-contain w-full h-full scale-125"
        />
      </div>

      {/* Product Image */}
      <div className="rounded-2xl p-4 mb-6 shadow-md w-full max-w-sm">
        <img
          src={caplogo}
          alt="Under Armour Cap"
          className="rounded-lg mx-auto"
        />
      </div>

      {/* Title */}
      <h2 className="text-white text-lg sm:text-xl font-bold mb-2 tracking-wide uppercase">
        Under Armour Cap is your best experience cap
      </h2>

      {/* Description */}
      <p className="text-gray-300 text-sm sm:text-base max-w-md mb-6">
        The Blitzing model is a popular choice for both athletic and casual wear.
      </p>

      {/* Register Button */}
      <button
        onClick={handleRegisterClick} // ✅ Added click handler
        className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-8 py-3 rounded-full shadow-md transition flex items-center justify-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.121 17.804A4 4 0 017.757 16h8.486a4 4 0 012.636 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        Register
      </button>

      {/* Login Text */}
     
      <p className="text-gray-300 text-sm mt-4">
        If you already have an account,{" "}
        <a href="#" className="text-blue-400 hover:underline">
            <button  onClick={() => navigate("/logincustomer_admin")}> login</button>

        </a>{" "}
        here
      </p>
    </div>
  );
};

export default Pagetwo;
