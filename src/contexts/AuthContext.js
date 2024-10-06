import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useState, useEffect } from "react";
import { refreshAccessToken } from "../hooks/useToken";
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext(null);
export const AuthProvider = ({ children, }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [justLoggedOut, setJustLoggedOut] = useState(false);
    const [justLoggedIn, setJustLoggedIn] = useState(false);
    useEffect(() => {
        // Verficar se o token está expirado
        const token = localStorage.getItem("accessToken");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decoded.exp > currentTime) {
                    setIsAuthenticated(true);
                }
                else {
                    // Token expirado, tentar renovar
                    refreshAccessToken()
                        .then(() => setIsAuthenticated(true))
                        .catch(() => {
                        // Se não conseguir renovar, remover o token e deslogar
                        localStorage.removeItem("accessToken");
                        setIsAuthenticated(false);
                    });
                }
            }
            catch (error) {
                // Se não conseguir renovar, remover o token e deslogar
                localStorage.removeItem("accessToken");
                setIsAuthenticated(false);
            }
        }
        else {
            setIsAuthenticated(false);
        }
        setLoading(false);
    }, []);
    const login = (token) => {
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
    return (_jsx(AuthContext.Provider, { value: {
            isAuthenticated,
            login,
            logout,
            loading,
            justLoggedOut,
            clearLogoutIndicator,
            justLoggedIn,
            clearLoginIndicator,
        }, children: !loading && children }));
};
