import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { registerUser } from "../utils/userHandler";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName : "",
    mobile : "",
    profilePic: null,
    
  });


  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePic: file });
    setPreview(URL.createObjectURL(file));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";
    if (!formData.password.trim()) newErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.fullName .trim()) newErrors.fullName  = "First Name is required.";
    if (!formData.mobile.trim()) newErrors.mobile = "Last Name is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted", formData);
      registerUser({...formData, pic : formData.profilePic});
      // Reset form or perform additional actions
    }
  };

  return (
    <div className="bg-animate min-h-screen flex items-center justify-center p-4 signup-bg-img " >
      
      <div className=" bg-opacity-30 bg-green-900 p-8 rounded-3xl shadow-2xl transform hover:scale-105 e- transition-all duration-500 w-2/5">
        <h1 className="text-4xl font-extrabold text-center mb-8 neon-text">
          Welcome to Whatsapp
        </h1>

        {/* Profile Picture Upload */}
        <div className="flex justify-center mb-6">
          <label
            htmlFor="profilePic"
            className="relative w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center text-white cursor-pointer hover:ring-2 hover:ring-pink-500 transition-all duration-300"
          >
            {preview ? (
              <img
                src={preview}
                alt="Profile Preview"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="flex flex-col justify-center items-center">
                <span className="hover:text-xl">+</span>
                <span className="text-md font-semibold hover:text-sm">Add Pic</span>
              </div>
            )}
            <input
              type="file"
              id="profilePic"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="hidden"
            />
          </label>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-between">
          <div className="relative">
            <input
              type="text"
              name="fullName"
              placeholder="Enter Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
            {errors.fullName  && <p className="text-pink-500 text-sm">{errors.fullName }</p>}
          </div>
          <div className="relative">
            <input
              type="text"
              name="mobile"
              placeholder="Enter Mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
            {errors.mobile && <p className="text-pink-500 text-sm">{errors.mobile}</p>}
          </div>
          </div>
          <div className="relative">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
            {errors.username && <p className="text-pink-500 text-sm">{errors.username}</p>}
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
            {errors.email && <p className="text-pink-500 text-sm">{errors.email}</p>}
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
            {errors.password && <p className="text-pink-500 text-sm">{errors.password}</p>}
          </div>
          
         <div className="flex flex-col space-y-2">
         <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Create an Account
          </button>
          <div className="text-center"><span className="font-bold text-white">or</span></div>
          <Link
            to={'/login'}
            className="w-full  text-center bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Login
          </Link>
         </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
