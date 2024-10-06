import { useQuery, UseQueryOptions, QueryKey } from "react-query";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./useAuth";
import api from "../services/api";

interface JwtPayload {
  exp: number;
  [key: string]: any;
}

export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("RefreshToken não encontrado.");
  }

  try {
    const response = await api.post<{ accessToken: string }>(
      "/token/refresh-token",
      { refreshToken }
    );

    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Erro ao renovar o token:", error);
    throw error;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const decoded = jwtDecode<JwtPayload>(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

const fetchWithTokenCheck = async <T,>(
  queryFn: () => Promise<T>
): Promise<T> => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("AccessToken não encontrado. Realize login.");
  }

  if (isTokenExpired(token)) {
    await refreshAccessToken();
  }

  return queryFn();
};

function useQueryWithAuth<T>(
  queryKey: QueryKey,
  queryFn: () => Promise<T>,
  options?: UseQueryOptions<T, Error>
) {
  const { logout } = useAuth();

  return useQuery<T, Error>(
    queryKey,
    async () => {
      try {
        return await fetchWithTokenCheck(queryFn);
      } catch (error: any) {
        if (error.response?.status === 401) {
          logout();
        }
        throw error;
      }
    },
    options
  );
}

export default useQueryWithAuth;
