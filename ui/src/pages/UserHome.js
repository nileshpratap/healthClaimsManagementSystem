import React from "react";
import SignedInNavbar from "../components/SignedInNavbar";
import UserDetails from "../components/UserDetails";
import UserPolicies from "../components/UserPolicies";
import CreatePolicy from "../components/CreatePolicy";

function UserHome() {
  window.history.pushState({}, undefined, "/user/home");
  return (
    <>
      <SignedInNavbar userType="user" />
      <div className="flex lg:flex-row flex-col">
        {/* Left Container (1/4 width) */}
        <div className="lg:w-1/4 p-4">
          {/* Your content for the left container */}

          <UserDetails />
        </div>

        {/* Right Container (3/4 width) */}
        <div className="lg:w-3/4 p-4">
          {/* Your content for the right container */}
          <CreatePolicy />
          <h1 className="text-blue-900 font-bold text-3xl p-3">Policies</h1>
          <UserPolicies />
        </div>
      </div>
    </>
  );
}

export default UserHome;
