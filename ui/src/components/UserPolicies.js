import React, { useEffect } from "react";
import { useUserStore } from "../store";
import axios from "axios";
import PolicyCard from "./PolicyCard";
import isEqual from "lodash/isEqual";

function UserPolicies() {
  const server = process.env.REACT_APP_SERVER_URL;
  const setPolicies = useUserStore((state) => state.setPolicies);
  let globalPolicies = useUserStore((state) => state.Policies);
  const getPolicies = async () => {
    try {
      const res = await axios.get(
        server + "/policies/showAllforUser?type=customer"
      );
      const Policies = res.data.policies;
      if (!isEqual(globalPolicies, Policies)) {
        setPolicies(Policies);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPolicies();
  }, []);
  useEffect(() => {}, [globalPolicies]);
  return (
    <div className="flex items-center justify-center flex-wrap">
      {globalPolicies.map((policy, id) => (
        <PolicyCard key={id} policyData={policy} />
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
