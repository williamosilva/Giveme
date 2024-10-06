import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { isTokenExpired, refreshAccessToken } from "../hooks/useToken";

// Extend the InternalAxiosRequestConfig type to include _retry
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const publicRoutes = ["/auth/login", "/auth/register", "/token/refresh-token"];

api.interceptors.request.use(
  async (config) => {
    if (!config.url) {
      console.error("URL da requisição está indefinida");
      return config;
    }

    if (publicRoutes.some((route) => config.url?.includes(route))) {
      return config;
    }

    let token = localStorage.getItem("accessToken");

    if (!token || isTokenExpired(token)) {
      try {
        token = await refreshAccessToken();
      } catch (error) {
        console.error("Erro ao renovar o token:", error);
        throw error;
      }
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.error("Erro no interceptador de requisição:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    if (!originalRequest || !originalRequest.url) {
      console.error("Configuração da requisição original está indefinida");
      return Promise.reject(error);
    }

    if (publicRoutes.some((route) => originalRequest.url?.includes(route))) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Falha ao renovar o token após erro 401:", refreshError);
        return Promise.reject(
          "Falha na autenticação, por favor faça login novamente"
        );
      }
    }

    return Promise.reject(error);
  }
);

export default api;
