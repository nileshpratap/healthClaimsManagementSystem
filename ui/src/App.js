import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserRegister from "./pages/UserRegister";
import UserLogin from "./pages/UserLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";
import UserHome from "./pages/UserHome";
import UserPolicy from "./pages/UserPolicy";
import NotFound from "./components/NotFound";
import { isString } from "lodash";
import { useEffect, useState } from "react";
import { useUserStore, useAdminStore } from "./store";

function App() {
  const userToken = useUserStore((state) => state.token);
  const adminToken = useAdminStore((state) => state.token);
  useEffect(() => {}, [adminToken, userToken]);

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLogin />} />

          {isString(userToken) && userToken !== "" && (
            <>
              <Route path="/user/home" element={<UserHome />} />
              <Route path="/user/policy/:PID" element={<UserPolicy />} />
            </>
          )}

          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {isString(adminToken) && adminToken !== "" && (
            <>
              <Route path="/admin/home" element={<AdminHome />} />
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
