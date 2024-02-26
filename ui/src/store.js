import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const userstore = (set) => ({
  token: "",
  userDetails: {
    UID: "",
    Name: "",
    Email: "",
    HealthCondition: "",
    DOB: "",
    PIDs: [],
  },
  Policies: [],
  Claims: [],
  setToken: (token) => {
    set((state) => ({
      token,
    }));
  },
  setUser: (user) => {
    const dateString = user.DOB;
    const dateObject = new Date(dateString);
    // Format the date without timezone information
    const formattedDate = dateObject.toISOString().split("T")[0];
    set((state) => ({
      userDetails: { ...state.userDetails, ...user, DOBdate: formattedDate },
    }));
  },
  clearUser: () => {
    set((state) => ({
      token: "",
      userDetails: {
        UID: "",
        Name: "",
        Email: "",
        HealthCondition: "",
        DOB: "",
        PIDs: [],
      },
      Policies: [],
      Claims: [],
    }));
  },
  setPolicies: (Policies) => {
    set((state) => ({ Policies }));
  },
  addPolicy: (newPolicy) => {
    set((state) => ({
      Policies: [...state.Policies, newPolicy],
      userDetails: {
        ...state.userDetails,
        PIDs: [...state.userDetails.PIDs, newPolicy.PID],
      },
    }));
  },
  addClaim: (newClaim, policy) => {
    set((state) => ({
      Claims: [...state.Claims, newClaim],
      Policies: [
        ...state.Policies.filter((p) => p.PID !== policy.PID),
        { ...policy, Claims: [...policy.Claims, newClaim.CID] },
      ],
    }));
  },
  setClaims: (Claims) => {
    set((state) => ({ Claims }));
  },
  removeClaim: (deletedClaim, PID) => {
    set((state) => ({
      Claims: state.Claims.filter((claim) => claim.CID != deletedClaim.CID),
      Policies: [
        ...state.Policies.filter((p) => p.PID !== PID),
        {
          ...state.Policies.filter((p) => p.PID === PID)[0],
          Claims: [
            ...state.Policies.filter((p) => p.PID === PID)[0].Claims.filter(
              (c) => c != deletedClaim.CID
            ),
          ],
        },
      ],
    }));
  },
  updateClaim: (updatedClaim) => {
    set((state) => ({
      Claims: [
        ...state.Claims.filter((c) => c.CID !== updatedClaim.CID),
        updatedClaim,
      ],
    }));
  },
});
const adminstore = (set) => ({
  token: "",
  EID: "",
  Name: "",
  Email: "",
  Policies: [],
  Claims: [],
  setToken: (token) => {
    set((state) => ({
      token,
    }));
  },
  setAdmin: (admin) => {
    set((state) => ({
      Name: admin.Name,
      Email: admin.Email,
      Policies: [...admin.Policies],
      EID: admin.EID,
    }));
  },
  clearAdmin: () => {
    set((state) => ({
      token: "",
      EID: "",
      Name: "",
      Email: "",
      Policies: [],
      Claims: [],
    }));
  },
});

export const useUserStore = create(
  devtools(
    persist(userstore, {
      name: "user",
    })
  )
);
export const useAdminStore = create(
  devtools(
    persist(adminstore, {
      name: "admin",
    })
  )
);
