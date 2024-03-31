import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function GoogleAuth() {
  const navigate = useNavigate();
  const handleSuccess = (credentialResponse) => {
    let info = jwtDecode(credentialResponse.credential);
    console.log("google sign in success!");
    console.log(info);
  };

  const handleError = () => {
    console.log("Login Failed");
  };
  return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
}
