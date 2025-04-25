import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

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
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-emerald-600 font-bold text-3xl mb-4">Login Page</h1>
      <form
        onSubmit={handleSubmit}
        className="min-w-md mx-auto shadow-xl p-4 rounded-2xl"
      >
        <label htmlFor="">Email</label>
        <input
          onChange={handleInputChange}
          name="email"
          type="email"
          value={formData.email}
          placeholder="Enter your Email"
          className="block p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <label htmlFor="">Password</label>
        <input
          onChange={handleInputChange}
          name="password"
          type="password"
          value={formData.password}
          placeholder="Enter Password"
          className="block p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
