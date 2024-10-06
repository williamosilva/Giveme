import axios from "axios";
import { useMutation } from "react-query";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const useLogoutMutation = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (refreshToken: string) => {
      const accessToken = localStorage.getItem("accessToken");

      return axios
        .post(
          "http://localhost:3000/auth/logout",
          { refreshToken },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          // console.log("Response data do logout:", res.data);
          return res.data;
        })
        .catch((error) => {
          console.error("Error:", error);
          throw error;
        });
    },
    onSuccess: (data) => {
      // console.log("Logout successful:", data);

      // Limpa os tokens do localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");

      // Chama a função de logout do hook de autenticação
      logout();

      // Redireciona para a página inicial ou outra página desejada
      navigate("/");
    },
    onError: (error) => {
      console.error("Error during logout:", error);
    },
  });
};
