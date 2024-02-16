import { create } from "zustand";

const store = (set) => ({
  user: { name: "name", userType: "customer" },
});

export const useStore = create(store);
