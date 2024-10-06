import { useQuery } from "react-query";
import api from "../services/api";

const fetchUserListById = async (id: string) => {
  try {
    // console.log("Iniciando fetchUserListById para ID:", id);
    const response = await api.get(`/user/getList/${id}`);
    // console.log("Resposta recebida para fetchUserListById:", response.data);
    return response.data.uploads;
  } catch (error) {
    console.error("Erro em fetchUserListById:", error);
    throw error;
  }
};

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserListById(id),
    enabled: !!id,
    onSuccess: (data) => {
      // console.log("Dados do usuário obtidos com sucesso:", data);
    },
    onError: (error) => {
      console.error("Erro ao obter dados do usuário:", error);
    },
  });
};
