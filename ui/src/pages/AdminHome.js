import React from "react";
import SignedInNavbar from "../components/SignedInNavbar";
import AdminDetails from "../components/AdminDetails";
import AdminPolicies from "../components/AdminPolicies";

function AdminHome() {
  return (
    <>
      <SignedInNavbar userType="admin" />
      <div className="flex lg:flex-row flex-col">
        {/* Left Container (1/4 width) */}
        <div className="lg:w-1/4 p-4">
          {/* Your content for the left container */}
          <AdminDetails />
        </div>

        {/* Right Container (3/4 width) */}
        <div className="lg:w-3/4 p-4">
          {/* Your content for the right container */}

          <h1 className="text-blue-900 font-bold text-3xl p-3">Policies</h1>
          <AdminPolicies />
        </div>
      </div>
    </>
  );
}

export default AdminHome;
