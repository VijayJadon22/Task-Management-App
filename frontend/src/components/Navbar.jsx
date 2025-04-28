import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/slices/authSlice.js";
import { CiLogin } from "react-icons/ci";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <nav className="w-full h-16 border border-gray-300 flex items-center justify-between sm:font-medium sm:text-sm md:font-medium md:text-lg px-2 md:px-10">
      <h3 className="">Task Manager</h3>
      <div className="flex items-center border">
        {isAuthenticated && (
          <Link to={"/"} className="mr-1 text-gray-600">
            Dashboard
          </Link>
        )}
        {isAuthenticated && (
          <Link to={"/create-project"} className="mr-1 text-gray-600">
            Create Project
          </Link>
        )}
        {!isAuthenticated && (
          <Link to={"/login"} className="mr-3 text-gray-600 flex items-center">
            Login <CiLogin size={20} className="block" />
          </Link>
        )}
        {!isAuthenticated && (
          <Link to={"/signup"} className="mr-1 text-gray-600">
            Signup
          </Link>
        )}
        {isAuthenticated && (
          <Link
            className="mr-1 text-gray-600"
            onClick={() => dispatch(logout())}
          >
            Logout
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
