import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Copy from "../components/Copy";
import { useUserStore } from "../store";

function LandingPage() {
  const clearUser = useUserStore((state) => state.clearUser);
  useEffect(() => {
    clearUser();
  }, []);

  return (
    <div className="bg-blue-500 min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Health ClaimsMS</h1>
        {/* ... Other content from the provided copy */}
        <p className="text-lg mt-4">
          Ready to take control of your health claims?
        </p>
      </div>
      <Copy />
    </div>
  );
}

export default LandingPage;
