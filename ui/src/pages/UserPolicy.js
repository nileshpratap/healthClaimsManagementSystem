import React from "react";
import { useParams } from "react-router";
import SignedInNavbar from "../components/SignedInNavbar";
import { useUserStore } from "../store";
import PolicyCard from "../components/PolicyCard";
import CreateClaim from "../components/CreateClaim";
import UserClaims from "../components/UserClaims";

function UserPolicy() {
  const { PID } = useParams();
  const Policies = useUserStore((state) => state.Policies);
  const Policy = Policies.filter((p) => p.PID === +PID)[0];
  return (
    <div>
      <SignedInNavbar />

      <div className="flex lg:flex-row flex-col">
        <PolicyCard policyData={Policy} />
        <div className="lg:w-2/3 w-full p-4">
          <CreateClaim policyData={Policy} />
          <UserClaims policyData={Policy} />
        </div>
      </div>
    </div>
  );
}

export default UserPolicy;
