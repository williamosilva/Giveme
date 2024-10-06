import axios from "axios";
import { useQuery } from "react-query";
import { isTokenExpired, refreshAccessToken } from "../hooks/useToken";
import { useNavigate } from "react-router-dom";

// Função para buscar o usuário por ID no backend
const fetchUserListById = async (id: string) => {
  let token = localStorage.getItem("accessToken");

  // Verifique se o token expirou
  if (!token || isTokenExpired(token)) {
    // console.log("Token expirado, tentando renovar...");
    token = await refreshAccessToken();
  }

  return axios
    .get(`http://localhost:3000/user/getList/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // console.log("List:", res.data.uploads);
      return res.data.uploads;
    })
    .catch((error) => {
      console.error("Error fetching user by ID:", error);
      throw error;
    });
};

export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUserListById(id),
    enabled: !!id,
    onSuccess: (data) => {
      // console.log("User fetched successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching user:", error);
    },
  });
};
