import { createContext, useContext, useState } from "react";

type AuthContextType = {
  IsLoggedIn: boolean;
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [IsLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("IsLoggedIn") === "true";
  });

  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem("username");
  });

  const login = (username: string) => {
    localStorage.setItem("IsLoggedIn", "true");
    localStorage.setItem("username", username);

    setIsLoggedIn(true);
    setUsername(username);
  };

  const logout = () => {
    localStorage.removeItem("IsLoggedIn");
    localStorage.removeItem("username");

    setIsLoggedIn(false);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ IsLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth harus digunakan di dalam AuthProvider");
  }

  return context;
}
