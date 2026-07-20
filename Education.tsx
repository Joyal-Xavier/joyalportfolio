"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface AdminAuthValue {
  isAdmin: boolean;
  password: string | null;
  login: (candidate: string) => Promise<boolean>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthValue | undefined>(undefined);
const SESSION_KEY = "pmVikasAdminSession";

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState<string | null>(null);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(SESSION_KEY);
    if (stored) setPassword(stored);
  }, []);

  const login = async (candidate: string) => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: candidate }),
      });
      const data = await res.json();
      if (data.ok) {
        setPassword(candidate);
        window.sessionStorage.setItem(SESSION_KEY, candidate);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setPassword(null);
    window.sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <AdminAuthContext.Provider value={{ isAdmin: Boolean(password), password, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
