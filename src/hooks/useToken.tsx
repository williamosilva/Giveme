import {
  useQuery,
  UseQueryOptions,
  QueryFunctionContext,
  QueryKey,
} from "react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import correto para jwtDecode
import { useAuth } from "./hooks/useAuth"; // Seu hook de autenticação que gerencia login/logout

// Função para renovar o accessToken (você pode modificar conforme seu fluxo)
const refreshAccessToken = async () => {
  const response = await axios.post("/token/refresh-token");
  const { accessToken } = response.data;
  localStorage.setItem("accessToken", accessToken);
  return accessToken;
};

// Função que verifica o accessToken e renova se necessário
const fetchWithTokenCheck = async <T,>(
  queryFn: () => Promise<T> // Passa a função de fetch diretamente
) => {
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
    axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`; // Atualiza o token no Axios
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  // Agora, você pode chamar a função original de fetch com o token válido
  return queryFn(); // Executa a função de fetch
};

// Hook que encapsula o useQuery com a verificação do accessToken
function useQueryWithAuth<T>(
  queryKey: QueryKey,
  queryFn: () => Promise<T>, // Passa a função de fetch
  options?: UseQueryOptions<T, Error>
) {
  const { logout } = useAuth(); // Importa o logout do hook de auth para usar em caso de falha

  return useQuery(
    queryKey,
    async () => {
      try {
        return await fetchWithTokenCheck(queryFn); // Verifica o token antes da requisição
      } catch (error: any) {
        if (error.response?.status === 401) {
          console.log("Falha na renovação do token, deslogando...");
          logout(); // Se a renovação falhar, desloga o usuário
        }
        throw error; // Propaga o erro para o hook de query lidar com ele
      }
    },
    options
  );
}

export default useQueryWithAuth;
