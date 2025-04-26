import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signup } from "../redux/slices/authSlice.js";
import { Link } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
  });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.email.trim() === "" ||
      formData.password.trim() === "" ||
      formData.name.trim() === "" ||
      formData.country.trim() === ""
    ) {
      toast.error("Please fill all fields", { id: "missingFields" });
      return;
    }
    dispatch(signup(formData));
  };
  return (
    <div className="p-4 flex flex-col items-center justify-evenly">
      <h1 className="text-emerald-600 font-bold text-3xl mb-4">Signup Page</h1>
      <form
        onSubmit={handleSubmit}
        className="min-w-md mx-auto shadow-2xl p-4 rounded-2xl text-gray-700"
      >
        <label htmlFor="name">Enter your Name</label>
        <input
          onChange={handleInputChange}
          name="name"
          type="text"
          value={formData.name}
          placeholder="eg: - Smith George"
          className="block p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <label htmlFor="">Enter Your Email</label>
        <input
          onChange={handleInputChange}
          name="email"
          type="email"
          value={formData.email}
          placeholder="eg:- @smith@email.com"
          className="block p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <label htmlFor="country">Enter Your Country</label>
        <input
          onChange={handleInputChange}
          name="country"
          type="country"
          value={formData.country}
          placeholder="eg:- India"
          className="block p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <label htmlFor="">Enter Your Password</label>
        <input
          onChange={handleInputChange}
          name="password"
          type="password"
          value={formData.password}
          placeholder="eg:- @example123."
          className="block p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <div className="flex items-center justify-between">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer"
            type="submit"
          >
            Login
          </button>
          <Link to={"/login"} className="text-blue-600 underline mr-2">
            Already a memeber? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
