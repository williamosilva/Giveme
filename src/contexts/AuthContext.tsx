import React, { createContext, useState, useEffect } from "react";
import { refreshAccessToken } from "../hooks/useToken";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
  justLoggedOut: boolean;
  justLoggedIn: boolean;
  clearLogoutIndicator: () => void;
  clearLoginIndicator: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [justLoggedOut, setJustLoggedOut] = useState<boolean>(false);
  const [justLoggedIn, setJustLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    console.log("Verificando token...");
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          setIsAuthenticated(true);
        } else {
          console.log("Token expirado. Tentando renovar...");
          refreshAccessToken()
            .then(() => setIsAuthenticated(true))
            .catch(() => {
              localStorage.removeItem("accessToken");
              setIsAuthenticated(false);
            });
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
    setJustLoggedIn(true);
    setJustLoggedOut(false);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    setJustLoggedIn(false);
    setJustLoggedOut(true);
  };

  const clearLogoutIndicator = () => {
    setJustLoggedOut(false);
  };

  const clearLoginIndicator = () => {
    setJustLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        loading,
        justLoggedOut,
        clearLogoutIndicator,
        justLoggedIn,
        clearLoginIndicator,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
