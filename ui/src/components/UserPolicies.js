import React, { useEffect, useState } from "react";
import { useUserStore } from "../store";
import axios from "axios";
import PolicyCard from "./PolicyCard";

function UserPolicies() {
  const [localpolicies, setlocalPolicies] = useState([]);
  const server = process.env.REACT_APP_SERVER_URL;
  const token = useUserStore((state) => state.token);
  const setPolicies = useUserStore((state) => state.setPolicies);
  const getPolicies = async () => {
    try {
      const res = await axios.get(
        server + "/policies/showAllforUser?type=customer"
      );
      const Policies = res.data.policies;
      setPolicies(Policies);
      setlocalPolicies(Policies);
      console.log(Policies);
    } catch (error) {
      console.log("User not found:", error.response.data);
      alert(JSON.stringify(error.response.data));
    }
  };
  useEffect(() => {
    getPolicies();
  }, []);
  return (
    <div className="flex items-center justify-start flex-wrap">
      {localpolicies.map((policy) => (
        <PolicyCard policyData={policy} />
      ))}
    </div>
  );
}

export default UserPolicies;

/*
Policy schema:

model Policies {
  PID       Int      @id @default(autoincrement())
  StartDate DateTime
  EndDate   DateTime
  PAmount   Float
  PBalance  Float    @default(-1)
  UID       String   @db.Char(16)
  EID       String   @default("not assigned") @db.Char(16)
  HEID      String   @default("not assigned") @db.Char(16)
  Claims    Int[]    @default([])
  Status    String   @default("Under Review")
}

*/
