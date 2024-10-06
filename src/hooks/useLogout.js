import { useMutation } from "react-query";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import api from "@services/ApiService";
export const useLogoutMutation = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (refreshToken) => {
            try {
                const response = await api.post("/auth/logout", {
                    refreshToken,
                });
                return response.data;
            }
            catch (error) {
                console.error("Error:", error);
                throw error;
            }
        },
        onSuccess: () => {
            // Limpa os tokens do localStorage
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userId");
            // Chama a função de logout do hook de autenticação
            logout();
            // Redireciona para a página inicial
            navigate("/");
        },
        onError: (error) => {
            console.error("Error during logout:", error);
        },
    });
};
