import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAdminStore } from "../store";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

function AdminRegister() {
  const [formData, setFormData] = useState({
    EID: "",
    Name: "",
    Email: "",
    Password: "",
  });

  const setAdmin = useAdminStore((state) => state.setAdmin);
  const setToken = useAdminStore((state) => state.setToken);

  const server = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    // Validate form fields here if needed
    // Validation logic
    const nameRegex = /^[a-zA-Z\s]+$/;
    const eidRegex = /^\d{16}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.Name)) {
      alert("Please enter a valid name containing only alphabets.");
      return;
    }

    if (!eidRegex.test(+formData.EID)) {
      alert("EID must be a 16-digit number.");
      return;
    }

    if (!emailRegex.test(formData.Email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (formData.Password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      const res = await axios.post(server + "/users/register?type=admin", {
        EID: formData.EID.toString(),
        cname: formData.Name,
        email: formData.Email,
        password: formData.Password,
      });
      const adminData = res.data["registered Admin"];
      let modAdminData = { ...adminData, Policies: [] };
      setAdmin(modAdminData);
      setToken(res.data.token);
      console.log(adminData);

      // Reset form data after submission
      setFormData({
        EID: "",
        Name: "",
        Email: "",
        Password: "",
      });

      if (res.status !== 200) {
        alert(JSON.stringify(res.data.msg), res.status);
      } else {
        navigate("/admin/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleGoogleRegister = async (res) => {
    // let info = jwtDecode(res.credential);
    localStorage.setItem("gtoken", JSON.stringify(res));
    navigate("/admin/onboarding");
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "EID" ? +value : value,
    });
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
      <div className="flex flex-col md:flex-row items-center justify-center bg-gray-100 gap-3">
        <div className="bg-blue-200 p-8 rounded-md shadow-md w-full max-w-md mt-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Admin Registration
          </h1>
          <form onSubmit={handleRegistration}>
            <div className="mb-4">
              <label
                htmlFor="UID"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                16-Digit AADHAR Number:
              </label>
              <input
                type="number"
                id="EID"
                name="EID"
                value={formData.EID}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter UID"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name:
              </label>
              <input
                type="text"
                id="Name"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter Name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="Email"
                name="Email"
                value={formData.Email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter Email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="Password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password:
              </label>
              <input
                type="password"
                id="Password"
                name="Password"
                value={formData.Password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter Password"
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
              Register
            </button>
          </form>
          <p className="text-gray-700 mt-4">
            Already registered?{" "}
            <Link to="/admin/login" className="text-black font-bold underline">
              Login here
            </Link>
          </p>
        </div>
        <div className="bg-blue-200 rounded-md h-fit p-6 shadow-md w-full max-w-md mt-10">
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 font-bold text-gray-800">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="py-2 font-bold text-gray-800">
                <GoogleLogin
                  onSuccess={handleGoogleRegister}
                  onError={() => {
                    console.log("Error in Admin Google Login");
                  }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminRegister;

/*
EID
Name
Email
Password
*/
