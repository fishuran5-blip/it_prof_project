import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";        // ✅ SUPABASE CLIENT
import bcrypt from "bcryptjs";                       // ✅ HASH PASSWORD

const RegisterCustomer = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    phone: "",
    email: "",
    birthDate: "",
    gender: "",
    agree: false,
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ SUBMIT TO SUPABASE (HASH PASSWORD)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      // ✅ HASH THE PASSWORD BEFORE SAVING
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      const { error } = await supabase
        .from("users") // ✅ INSERT HERE (users table)
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            password: hashedPassword,        // ✅ SAFE (hashed)
            phone: formData.phone,
            birth_date: formData.birthDate,
            gender: formData.gender,
            agree: formData.agree,
            role: "customer",                // ✅ DEFAULT ROLE
          },
        ]);

      if (error) {
        console.error(error);
        alert("❌ Registration Failed: " + error.message);
        return;
      }

      // ✅ SUCCESS MODAL POPUP
      setShowModal(true);

      setTimeout(() => {
        setShowModal(false);
        navigate("/logincustomer_admin");
      }, 2000);

    } catch (err) {
      alert("❌ Error hashing password: " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800 px-4 relative">
      {showModal && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-2 text-green-600">
              ✅ Account Created Successfully!
            </h3>
            <p className="text-gray-700">Redirecting to login page...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 text-center">Register</h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          🛒 Faster checkout & order tracking.
        </p>

        {/* First Name */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
            required
          />
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1 text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            required
          />
        </div>

        {/* Birthdate & Gender */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1 text-gray-700">Birth Date</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1 text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-sm text-gray-600">I agree to receive promotional updates.</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button type="submit" className="w-full bg-black text-white py-3 rounded-md font-semibold">
            Create Account
          </button>

          <button
            type="button"
            onClick={() => navigate("/pagetwo")}
            className="w-full bg-gray-300 py-3 rounded-md"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterCustomer;
