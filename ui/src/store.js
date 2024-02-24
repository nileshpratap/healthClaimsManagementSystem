import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const userstore = (set) => ({
  userDetails: {
    UID: "",
    Name: "",
    Email: "",
    Password: "",
    HealthCondition: "",
    DOB: "",
    PIDs: [],
  },
  Policies: [],
  claims: [],
  setUser: (user) => {
    set((state) => ({
      userDetails: { ...state.userDetails, ...user },
    }));
  },
});
const adminstore = (set) => ({
  userDetails: {
    EID: "",
    Name: "",
    Email: "",
    Password: "",
    Policies: [],
  },
  Policies: [],
  claims: [],
});
export const useUserStore = create(
  devtools(
    persist(userstore, {
      name: "user",
    })
  )
);
export const useAdminstore = create(
  devtools(
    persist(userstore, {
      name: "admin",
    })
  )
);
