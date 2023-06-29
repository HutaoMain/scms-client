import { create } from "zustand";

interface AuthStore {
  user: string | null;
  setUser: (user: string) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: localStorage.getItem("scms-user") || null,
  setUser: (user) => {
    localStorage.setItem("scms-user", user);
    set({ user });
  },
  clearUser: () => {
    localStorage.removeItem("scms-user");
    set({ user: null });
  },
}));

export default useAuthStore;
