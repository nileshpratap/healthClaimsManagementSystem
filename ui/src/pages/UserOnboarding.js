import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUserStore } from "../store";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function UserOnboarding() {
  const [formData, setFormData] = useState({
    UID: "",
    HealthCondition: 1, // Default value
    DOB: "",
  });

  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);

  const server = process.env.REACT_APP_SERVER_URL;

  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    // Validate form fields here if needed
    // Validation logic
    const uidRegex = /^\d{16}$/;

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

    if (formData.HealthCondition < 1 || formData.HealthCondition > 10) {
      alert("Health Condition must be a number between 1 and 10.");
      return;
    }

    // date string modification
    const dateString = new Date(formData.DOB).toISOString();

    const info = jwtDecode(
      JSON.parse(localStorage.getItem("gtoken")).credential
    );
    const cname = info.name;
    const email = info.email;

    console.log(
      formData.UID.toString(),
      cname,
      email,
      +formData.HealthCondition,
      "password",
      dateString
    );
    try {
      const res = await axios.post(
        server + "/users/registerCustomer?type=customer",
        {
          uid: formData.UID.toString(),
          cname,
          email,
          healthCondition: +formData.HealthCondition,
          password: "password",
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
      <div className="flex flex-col md:flex-row justify-center bg-gray-100 gap-3">
        <div className="bg-blue-200 p-8 rounded-md shadow-md w-full max-w-md mt-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Few Details before you jump in..
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
          </p>
        </div>
      </div>
    </>
  );
}

export default UserOnboarding;
