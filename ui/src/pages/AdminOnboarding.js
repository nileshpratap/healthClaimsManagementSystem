import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAdminStore } from "../store";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function AdminOnboarding() {
  const handleRegistration = async (e) => {
    e.preventDefault();
    const info = jwtDecode(
      JSON.parse(localStorage.getItem("gtoken")).credential
    );
    const cname = info.name;
    const email = info.email;
    try {
      console.log(formData.EID, cname, email, "password");
      const res = await axios.post(server + "/users/register?type=admin", {
        EID: formData.EID.toString(),
        cname,
        email,
        password: "password",
      });
      const adminData = res.data["registered Admin"];
      let modAdminData = { ...adminData, Policies: [] };
      setAdmin(modAdminData);
      setToken(res.data.token);
      console.log(adminData);

      // Reset form data after submission
      setFormData({
        EID: "",
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "EID" ? +value : value,
    });
  };
  const [formData, setFormData] = useState({
    EID: "",
  });

  const setAdmin = useAdminStore((state) => state.setAdmin);
  const setToken = useAdminStore((state) => state.setToken);

  const server = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();
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
                id="EID"
                name="EID"
                value={formData.EID}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter UID"
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
            <Link to="/admin/login" className="text-black font-bold underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default AdminOnboarding;
