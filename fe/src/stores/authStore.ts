import { create } from "zustand";

type AuthState = {
  signUpInProgress: boolean;
  setSignUpInProgress: (signUpInProgress: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  signUpInProgress: false,
  setSignUpInProgress: (signUpInProgress: boolean) => set({ signUpInProgress }),
}))