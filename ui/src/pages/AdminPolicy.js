import React from "react";
import { useParams } from "react-router";
import SignedInNavbar from "../components/SignedInNavbar";
import AdminPolicyCard from "../components/AdminPolicyCard";
import AdminClaims from "../components/AdminClaims";
import UserDetailsforAdmin from "../components/UserDetailsforAdmin";

function AdminPolicy() {
  const { PID } = useParams();
  return (
    <div>
      <SignedInNavbar userType="admin" />
      <div className="flex lg:flex-row md:flex-col flex-col">
        <UserDetailsforAdmin PID={PID} />
        <AdminPolicyCard PID={PID} />
      </div>
      <div className="w-2/3 p-4">
        <AdminClaims PID={PID} />
      </div>
    </div>
  );
}

export default AdminPolicy;
