import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email.trim() === "" || formData.password.trim() === "") {
      toast.error("Please fill all fields", { id: "missingFields" });
      return;
    }
    dispatch(login(formData));
  };
  return (
    <div className="p-4 flex flex-col  items-center">
      <h1 className="text-emerald-600 font-bold text-3xl mb-12">Login Page</h1>
      <form
        onSubmit={handleSubmit}
        className="min-w-md mx-auto shadow-2xl p-4 rounded-2xl"
      >
        <label htmlFor="">Enter Your Email</label>
        <input
          onChange={handleInputChange}
          name="email"
          type="email"
          value={formData.email}
          placeholder="eg:- @smith@email.com"
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
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
          type="submit"
        >
          Login
          </button>
          <Link to={"/signup"} className="text-blue-600 underline">Not a memeber? create a account</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
