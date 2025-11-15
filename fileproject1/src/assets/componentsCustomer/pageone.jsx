import React from "react";
import { useNavigate } from "react-router-dom"; // 🧭 Import navigation hook
import logoUA from "../image/logoUA.png";
import caplogo from "../image/caplogo.png";

const Pageone = () => {
  const navigate = useNavigate(); // initialize navigation

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center text-center px-4 pt-6">
      {/* Logo */}
      <div className="w-28 h-28 mx-auto flex items-center justify-center mt-2 mb-8">
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
      <h2 className="text-white text-xl sm:text-2xl font-bold mb-2 tracking-wide">
        UNDER ARMOUR CAP IS YOUR BEST EXPERIENCE CAP
      </h2>

      {/* Description */}
      <p className="text-gray-300 text-sm sm:text-base max-w-md mb-6">
        The Blitzing model is a popular choice for both athletic and casual wear.
      </p>

      {/* CTA Button — navigates to page two */}
      <button
        onClick={() => navigate("/pagetwo")}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
      >
        You can enjoy shopping with UA cap
      </button>

      {/* Footer CTA button */}
       <button
        onClick={() => navigate("/pagetwo")}
        className="bg-blue-600 hover:bg-red-600 mt-5 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
      >
       SHOP NOW!
      </button>
    </div>
  );
};

export default Pageone;
