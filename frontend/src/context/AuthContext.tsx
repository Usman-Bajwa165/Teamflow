"use client";
// frontend/src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import * as api from "../lib/api";
import { useRouter } from "next/navigation";

type User = { id: string; email: string; name?: string; role?: string } | null;

type AuthContextType = {
  user: User;
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// typed shape returned by your API on login
type LoginResponse = {
  tokens: { accessToken: string; refreshToken: string };
  user: { id: string; email: string; name?: string; role?: string };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // lazy initializers read localStorage only once during initial render (client-side)
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("tf_access");
  });

  const [refreshToken, setRefreshToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("tf_refresh");
  });

  const [user, setUser] = useState<User>(() => {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem("tf_user");
    try {
      return raw ? (JSON.parse(raw) as User) : null;
    } catch {
      return null;
    }
  });

  const router = useRouter();

  const saveTokens = (tokens: {
    accessToken: string;
    refreshToken: string;
  }) => {
    localStorage.setItem("tf_access", tokens.accessToken);
    localStorage.setItem("tf_refresh", tokens.refreshToken);
    setAccessToken(tokens.accessToken);
    setRefreshToken(tokens.refreshToken);
  };

  const login = async (email: string, password: string) => {
    const res = (await api.login({ email, password })) as LoginResponse;
    // behaviour unchanged: store tokens and user and navigate
    saveTokens(res.tokens);
    setUser(res.user);
    localStorage.setItem("tf_user", JSON.stringify(res.user));
    router.push("/teams");
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch {
      /* ignore */
    }
    localStorage.removeItem("tf_access");
    localStorage.removeItem("tf_refresh");
    localStorage.removeItem("tf_user");
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
    router.push("/login");
  };

  const register = async (email: string, password: string, name?: string) => {
    await api.register({ email, password, name });
    // after register, redirect to login
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, refreshToken, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
