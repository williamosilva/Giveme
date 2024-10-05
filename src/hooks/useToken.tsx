import {
  useQuery,
  UseQueryOptions,
  QueryFunctionContext,
  QueryKey,
} from "react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "./useAuth";

// Função para renovar o accessToken (você pode modificar conforme seu fluxo)
export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("RefreshToken não encontrado.");
  }

  try {
    const response = await axios.post(
      "http://localhost:3000/token/refresh-token",
      { refreshToken } // Enviando com a chave 'refreshToken' para corresponder ao backend
    );

    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Erro ao renovar o token:", error);
    throw error;
  }
};

export const isTokenExpired = (token: string) => {
  const decoded: any = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decoded.exp < currentTime;
};

// Função que verifica o accessToken e renova se necessário
const fetchWithTokenCheck = async <T,>(queryFn: () => Promise<T>) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new Error("AccessToken não encontrado. Realize login.");
  }

  const decoded: any = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  // Se o token expirou, tenta renovar
  if (decoded.exp < currentTime) {
    console.log("Token expirado, tentando renovar...");
    const newToken = await refreshAccessToken();
    // Atualiza o token no cabeçalho Authorization
    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  // Chama a função de fetch original com o token válido
  return queryFn();
};

// Hook que encapsula o useQuery com a verificação do accessToken
function useQueryWithAuth<T>(
  queryKey: QueryKey,
  queryFn: () => Promise<T>,
  options?: UseQueryOptions<T, Error>
) {
  const { logout } = useAuth(); // Pega o logout do contexto de autenticação

  return useQuery(
    queryKey,
    async () => {
      try {
        // Verifica o token antes de fazer a requisição
        return await fetchWithTokenCheck(queryFn);
      } catch (error: any) {
        // Se a renovação do token falhar, desloga o usuário
        if (error.response?.status === 401) {
          console.log("Falha na renovação do token, deslogando...");
          logout();
        }
        throw error; // Propaga o erro para o hook de query lidar
      }
    },
    options
  );
}

export default useQueryWithAuth;
