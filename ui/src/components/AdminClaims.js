import React, { useState } from "react";
import { useAdminStore } from "../store";
import axios from "axios";
import { useEffect } from "react";
import isEqual from "lodash/isEqual";
import AdminClaim from "./AdminClaim";

function AdminClaims({ pid }) {
  const server = process.env.REACT_APP_SERVER_URL;
  const setClaims = useAdminStore((state) => state.setClaims);
  const globalPolicies = useAdminStore((state) => state.Policies);
  const globalClaims = useAdminStore((state) => state.Claims);

  const Policy = globalPolicies.filter((p) => p.PID === pid)[0];
  const { Claims, PID, EID, StartDate, EndDate, PAmount, PBalance, Status } =
    Policy;

  const [localClaims, setLocalClaims] = useState(
    globalClaims.filter((c) => c.PID == PID)
  );

  const getClaims = async () => {
    try {
      const res = await axios.get(
        `${server}/claims/showAllforPolicy?type=admin&PID=${PID}`
      );

      const claims = res.data.claims;

      if (!isEqual(globalClaims, claims)) {
        setClaims(claims);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClaims();
  }, []);
  useEffect(() => {
    setLocalClaims(globalClaims.filter((c) => c.PID == PID));
  }, [globalClaims]);

  return (
    <>
      <h5 className="text-blue-900 font-bold text-md p-3">
        Total Claims: {globalClaims.length}
      </h5>
      <div className="flex lg:flex-col flex-row flex-wrap justify-evenly items-start">
        {localClaims.map((claim, id) => (
          <AdminClaim key={id} ClaimData={claim} policyData={Policy} />
        ))}
      </div>
    </>
  );
}

export default AdminClaims;
