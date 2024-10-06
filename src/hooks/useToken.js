import { useQuery } from "react-query";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./useAuth";
import api from "@services/ApiService";
export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
        throw new Error("RefreshToken não encontrado.");
    }
    try {
        const response = await api.post("/token/refresh-token", { refreshToken });
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        return accessToken;
    }
    catch (error) {
        console.error("Erro ao renovar o token:", error);
        throw error;
    }
};
export const isTokenExpired = (token) => {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
};
const fetchWithTokenCheck = async (queryFn) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
        throw new Error("AccessToken não encontrado. Realize login.");
    }
    if (isTokenExpired(token)) {
        await refreshAccessToken();
    }
    return queryFn();
};
function useQueryWithAuth(queryKey, queryFn, options) {
    const { logout } = useAuth();
    return useQuery(queryKey, async () => {
        try {
            return await fetchWithTokenCheck(queryFn);
        }
        catch (error) {
            if (error.response?.status === 401) {
                logout();
            }
            throw error;
        }
    }, options);
}
export default useQueryWithAuth;
