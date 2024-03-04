import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUserStore } from "../store";
import { useNavigate } from "react-router-dom";

function UserRegister() {
  const [formData, setFormData] = useState({
    UID: "",
    Name: "",
    Email: "",
    Password: "",
    HealthCondition: 1, // Default value
    DOB: "",
  });

  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);

  const server = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Validate form fields here if needed
    // Validation logic
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const uidRegex = /^\d{16}$/;

    if (!nameRegex.test(formData.Name)) {
      alert("Please enter a valid name containing only alphabets.");
      return;
    }

    const dobDate = new Date(formData.DOB);
    const eighteenYearsAgo = new Date();
    const hundredYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    hundredYearsAgo.setFullYear(hundredYearsAgo.getFullYear() - 100);

    if (dobDate >= eighteenYearsAgo && dobDate <= hundredYearsAgo) {
      alert("Date of Birth must be between 18 to 100.");
      return;
    }

    if (!uidRegex.test(String(formData.UID))) {
      alert("UID must be a 16-digit number.");
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

    if (formData.HealthCondition < 1 || formData.HealthCondition > 10) {
      alert("Health Condition must be a number between 1 and 10.");
      return;
    }

    // date string modification
    const dateString = new Date(formData.DOB).toISOString();

    try {
      const res = await axios.post(
        server + "/users/registerCustomer?type=customer",
        {
          uid: formData.UID.toString(),
          cname: formData.Name,
          email: formData.Email,
          healthCondition: +formData.HealthCondition,
          password: formData.Password,
          dob: dateString,
        }
      );
      const userData = res.data["registered user"];
      setUser(userData);
      setToken(res.data.token);

      // Reset form data after submission
      setFormData({
        UID: null,
        Name: "",
        Email: "",
        Password: "",
        HealthCondition: 1,
        DOB: "",
      });

      if (res.status !== 200) {
        alert(JSON.stringify(res.data.msg), res.status);
      } else {
        navigate("/user/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "UID" ? +value : value,
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
      <div className="flex items-center justify-center bg-gray-100">
        <div className="bg-blue-200 p-8 rounded-md shadow-md w-full max-w-md mt-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            User Registration
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
                id="UID"
                name="UID"
                value={formData.UID}
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
            <div className="mb-4">
              <label
                htmlFor="HealthCondition"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Health Condition:
              </label>
              <input
                type="range"
                id="HealthCondition"
                name="HealthCondition"
                min="1"
                max="10"
                value={formData.HealthCondition}
                onChange={handleInputChange}
                className="w-full"
                required
              />
              <span className="text-gray-800">{formData.HealthCondition}</span>
            </div>
            <div className="mb-4">
              <label
                htmlFor="DOB"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Date of Birth:
              </label>
              <input
                type="date"
                id="DOB"
                name="DOB"
                value={formData.DOB}
                onChange={handleInputChange}
                max={new Date().toISOString().split("T")[0]}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
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
            <Link to="/user/login" className="text-black font-bold underline">
              Login here
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
}

export default UserRegister;
