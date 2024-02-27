import React, { useEffect } from "react";
import { useAdminStore } from "../store";
import axios from "axios";
import PolicyCard from "./PolicyCard";
import isEqual from "lodash/isEqual";

function AdminPolicies() {
  const server = process.env.REACT_APP_SERVER_URL;
  const setPolicies = useAdminStore((state) => state.setPolicies);
  const globalPolicies = useAdminStore((state) => state.Policies);
  const getPolicies = async () => {
    try {
      const res = await axios.get(
        server + "/policies/showAllforAdmin?type=admin"
      );
      const Policies = res.data.adminPolicies;
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
    <>
      <h5 className="text-blue-900 font-bold text-md p-3">
        Total Policies: {globalPolicies.length}
      </h5>
      <div className="flex items-center justify-center flex-wrap">
        {globalPolicies.map((policy, id) => (
          <PolicyCard policyData={policy} userType="admin" />
        ))}
      </div>
    </>
  );
}

export default AdminPolicies;
