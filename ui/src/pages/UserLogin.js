import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUserStore } from "../store";
import { useNavigate } from "react-router-dom";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);

  const server = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("please enter password greater than length 6");
      setPassword("");
      return;
    }
    try {
      const res = await axios.post(server + "/users/login?type=customer", {
        email,
        password,
      });
      if (res.status !== 200) {
        setEmail("");
        setPassword("");
        alert(JSON.stringify(res.data.msg), res.status);
      }
      const userData = res.data["logged in customer"];
      setUser(userData);
      setToken(res.data.token);
      // console.log(userData);

      navigate("/user/home");

      // console.log("Login clicked with email:", email, "and password:", password);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <nav>
        <div className="bg-gray-800 p-4">
          <Link to="/" className="text-white text-xl font-bold">
            HCMS
          </Link>
        </div>
      </nav>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-blue-100 p-8 rounded-md shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">User Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your password"
                required
              />
              <span className="text-gray-800 text-sm mt-4">
                Password length should be atleast 6 characters
              </span>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>
          </form>
          <p className="text-gray-700 mt-4">
            Please{" "}
            <Link
              to="/user/register"
              className="text-black font-bold underline"
            >
              register
            </Link>{" "}
            if you are new here.
          </p>
        </div>
      </div>
    </>
  );
}

export default UserLogin;
