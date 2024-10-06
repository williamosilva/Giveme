import axios, { AxiosError } from "axios";
import { isTokenExpired, refreshAccessToken } from "../hooks/useToken";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const publicRoutes = ["/auth/login", "/auth/register", "/token/refresh-token"];

api.interceptors.request.use(
  async (config) => {
    // console.log("Interceptor de requisição:", config.url);

    if (!config.url) {
      console.error("URL da requisição está indefinida");
      return config;
    }

    if (publicRoutes.some((route) => config.url?.includes(route))) {
      //   console.log("Rota pública detectada, pulando verificação de token");
      return config;
    }

    let token = localStorage.getItem("accessToken");

    if (!token || isTokenExpired(token)) {
      //   console.log("Token não encontrado ou expirado, tentando renovar");
      try {
        token = await refreshAccessToken();
        // console.log("Token renovado com sucesso");
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
    // console.log("Resposta bem-sucedida:", response.config.url);
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (!originalRequest || !originalRequest.url) {
      console.error("Configuração da requisição original está indefinida");
      return Promise.reject(error);
    }

    // console.log(
    //   "Erro na resposta:",
    //   originalRequest.url,
    //   error.response?.status
    // );

    if (publicRoutes.some((route) => originalRequest.url?.includes(route))) {
      //   console.log("Erro em rota pública, não tentando renovar token");
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      //   console.log("Erro 401 detectado, tentando renovar token");
      originalRequest._retry = true;

      try {
        const token = await refreshAccessToken();
        // console.log("Token renovado com sucesso após erro 401");
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Falha ao renovar o token após erro 401:", refreshError);
        // Aqui você pode chamar uma função de logout se necessário
        return Promise.reject(
          "Falha na autenticação, por favor faça login novamente"
        );
      }
    }

    return Promise.reject(error);
  }
);

export default api;
