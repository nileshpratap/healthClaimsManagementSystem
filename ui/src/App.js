import "./App.css";
import { BrowserRouter, useParams, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserRegister from "./pages/UserRegister";
import UserLogin from "./pages/UserLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";

function App() {
  let { userType } = useParams();
  userType = userType || "neutral";

  if (userType == "user") {
    return (
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<UserRegister />} />
            <Route path="/login" element={<UserLogin />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else if (userType == "admin") {
    return (
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<AdminRegister />} />
            <Route path="/login" element={<AdminLogin />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  } else {
    return (
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
