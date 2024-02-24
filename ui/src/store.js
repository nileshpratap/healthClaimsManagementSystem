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
export const useCourseStore = create(
  devtools(
    persist(userstore, {
      name: "user",
    })
  )
);
export const useadminstore = create(
  devtools(
    persist(userstore, {
      name: "admin",
    })
  )
);
