import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const userstore = (set) => ({
  token: "",
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
  clearUser: (user) => {
    set((state) => ({
      token: "",
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
    }));
  },
  setPolicies: (Policies) => {
    set((state) => ({ Policies }));
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
