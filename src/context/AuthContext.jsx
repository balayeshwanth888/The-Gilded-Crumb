"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const loggedIn = localStorage.getItem("loggedIn");
      const savedUser = localStorage.getItem("currentUser");

      if (loggedIn === "true" && savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (err) {
      console.error("Failed to restore session:", err);
    }
  }, []);

  const login = (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const matchedUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (matchedUser) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(matchedUser));
        setUser(matchedUser);
        return true;
      }

      return false;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  const signup = (newUser) => {
    try {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const exists = users.find((u) => u.email === newUser.email);
      if (exists) {
        return { success: false, message: "Email already exists" };
      }

      const userWithId = { id: Date.now(), ...newUser };
      users.push(userWithId);
      localStorage.setItem("users", JSON.stringify(users));

      return { success: true, user: userWithId };
    } catch (err) {
      console.error("Signup failed:", err);
      return { success: false, message: "Something went wrong" };
    }
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}