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
      <div className="mx-auto flex w-full lg:w-8/12 lg:flex-row md:flex-col flex-col">
        <UserDetailsforAdmin pid={+PID} />
        <AdminPolicyCard pid={+PID} />
      </div>
      <div className="w-2/3 p-4 my-2 mx-auto">
        <AdminClaims pid={+PID} />
      </div>
    </div>
  );
}

export default AdminPolicy;
