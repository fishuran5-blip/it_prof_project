import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; // ✅ Supabase import

const LoginCustomerAdmin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loginType, setLoginType] = useState("customer"); // track admin or customer

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ ADMIN LOGIN CHECK (hard-coded)
    if (formData.email === "admin" && formData.password === "admin") {
      setLoginType("admin");
      setShowSuccessModal(true);

      setTimeout(() => {
        navigate("/adminhome");
      }, 2000);
      return;
    }

    // ✅ CUSTOMER LOGIN USING SUPABASE
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("email", formData.email)
      .eq("password", formData.password)
      .single();

    if (error || !data) {
      alert("❌ Invalid email or password");
      return;
    }

    // ✅ Store logged-in customer
    localStorage.setItem("loggedInCustomerEmail", data.email);

    setLoginType("customer");
    setShowSuccessModal(true);

    setTimeout(() => {
      navigate("/customerhomepage");
    }, 2000);
  };

  const closeModalAndRedirect = () => {
    setShowSuccessModal(false);
    if (loginType === "admin") navigate("/adminhome");
    else navigate("/customerhomepage");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-lg p-8"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-left">
          Login
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Username or Email
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-2 relative">
          <label className="block text-sm font-semibold mb-1 text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 pr-16"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8 text-sm font-semibold text-gray-600 hover:text-black"
          >
            {showPassword ? "HIDE" : "SHOW"}
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition"
        >
          LOGIN
        </button>

        <p className="text-xs text-gray-600 text-center mt-4">
          New user?{" "}
          <button
            type="button"
            onClick={() => navigate("/registercustomer")}
            className="text-blue-500 hover:underline font-semibold"
          >
            Register
          </button>
        </p>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-green-600">
              Login Successful!
            </h3>
            <p className="mb-6">
              Redirecting to{" "}
              {loginType === "admin" ? "Admin Dashboard" : "Customer Homepage"}
              ...
            </p>
            <button
              onClick={closeModalAndRedirect}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Go Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginCustomerAdmin;
