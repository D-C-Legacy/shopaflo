import React, { createContext, useEffect, useState } from "react";
import { buyer } from "../data";
import { MOCK_CONFIG } from "../constants";
import type { AuthPage, AuthState, User } from "../types";
type AuthContextValue = {
  state: AuthState;
  page: AuthPage;
  user: User;
  email: string;
  setPage: (page: AuthPage) => void;
  finishOnboarding: () => void;
  signIn: (email: string) => void;
  beginSignUp: (name: string, username: string, email: string) => void;
  verify: () => void;
  logout: () => void;
  restartOnboarding: () => void;
  updateUser: (changes: Partial<User>) => void;
};
export const AuthContext = createContext<AuthContextValue | null>(null);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>("loading");
  const [page, setPage] = useState<AuthPage>("welcome");
  const [user, setUser] = useState<User>(buyer);
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState<User | null>(null);
  useEffect(() => {
    const timer = setTimeout(
      () => setState("onboarding"),
      MOCK_CONFIG.initializationMs,
    );
    return () => clearTimeout(timer);
  }, []);
  const finishOnboarding = () => {
    setPage("welcome");
    setState("unauthenticated");
  };
  const signIn = (value: string) => {
    setEmail(value.trim());
    setUser(buyer);
    setPending(null);
    setState("authenticated");
  };
  const beginSignUp = (name: string, username: string, value: string) => {
    setPending({ ...buyer, name: name.trim(), handle: "@" + username });
    setEmail(value.trim());
    setPage("verification");
  };
  const verify = () => {
    if (pending) setUser(pending);
    setPending(null);
    setState("authenticated");
  };
  const logout = () => {
    setPending(null);
    setPage("welcome");
    setState("unauthenticated");
  };
  const restartOnboarding = () => {
    setPending(null);
    setPage("welcome");
    setState("onboarding");
  };
  return (
    <AuthContext.Provider
      value={{
        state,
        page,
        user,
        email,
        setPage,
        finishOnboarding,
        signIn,
        beginSignUp,
        verify,
        logout,
        restartOnboarding,
        updateUser: (changes) => setUser((v) => ({ ...v, ...changes })),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
