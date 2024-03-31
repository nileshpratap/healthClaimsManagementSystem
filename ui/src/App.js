import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserRegister from "./pages/UserRegister";
import UserLogin from "./pages/UserLogin";
import UserOnboarding from "./pages/UserOnboarding";
import AdminRegister from "./pages/AdminRegister";
import AdminOnboarding from "./pages/AdminOnboarding";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";
import UserHome from "./pages/UserHome";
import UserPolicy from "./pages/UserPolicy";
import AdminPolicy from "./pages/AdminPolicy";
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
          <Route path="/user/onboarding" element={<UserOnboarding />} />

          {isString(userToken) && userToken !== "" && (
            <>
              <Route path="/user/home" element={<UserHome />} />
              <Route path="/user/policy/:PID" element={<UserPolicy />} />
            </>
          )}

          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/onboarding" element={<AdminOnboarding />} />
          <Route path="/admin/policy/:PID" element={<AdminPolicy />} />

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
