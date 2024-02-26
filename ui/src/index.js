import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    // Set the Authorization header with the token from localStorage
    const user = JSON.parse(localStorage.getItem("user")); // Replace 'yourTokenKey' with your actual key
    const admin = JSON.parse(localStorage.getItem("admin")); // Replace 'yourTokenKey' with your actual key
    let token = user.state.token;
    if (token === "") token = admin.state.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
setTimeout(() => {
  localStorage.clear();
}, 1000 * 60 * 60);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
