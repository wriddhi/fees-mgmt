// import type { User } from '@/types/db.types';
import React, { createContext, useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

export interface User {
  id: string;
  name: string;
  role: "admin" | "accountant" | "parent";
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (
    id: string,
    password: string,
    role: User["role"]
  ) => Promise<{ success: boolean; message: string }>;
  logout: (redirect?: boolean) => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  login: () => Promise.resolve({ success: false, message: "" }),
  logout: () => Promise.resolve(),
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}): React.ReactNode => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const login = async (id: string, password: string, role: User["role"]) => {
    setLoading(true);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password, role }),
    });
    const auth: {
      message: string;
      error: boolean;
      user: User | null;
    } = await response.json();
    setLoading(false);

    if (auth.error) {
      return { success: false, message: auth.message };
    }

    setUser(auth.user);
    return { success: true, message: auth.message };
  };

  const logout = async (redirect?: boolean) => {
    setLoading(true);
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);
    setUser(null);
    if (!redirect) return;
    router.push("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response = await fetch("/api/auth/user");
      const auth: {
        message: string;
        error: boolean;
        user: User | null;
      } = await response.json();
      setLoading(false);
      setUser(auth.user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!loading && !user && router.pathname.includes("/dashboard")) {
      console.log("Redirecting to login from AuthContext");
      router.push("/login");
    } else if (!loading && user && router.pathname === "/login") {
      console.log("Redirecting to dashboard from AuthContext");
      router.push("/dashboard");
    }
  }, [router, user, loading]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
