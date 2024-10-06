import { useMutation } from "react-query";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "@services/ApiService";
export const useLoginMutation = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [, setErrorMessage] = useState(null);
    return useMutation({
        mutationFn: async (credentials) => {
            const response = await api.post("/auth/login", credentials);
            localStorage.setItem("userId", response.data.userId);
            return response.data;
        },
        onSuccess: (data) => {
            setErrorMessage(null);
            if (data.accessToken) {
                login(data.accessToken);
                localStorage.setItem("accessToken", data.accessToken);
            }
            if (data.refreshToken) {
                localStorage.setItem("refreshToken", data.refreshToken);
            }
            navigate("/form");
        },
        onError: (error) => {
            console.error("Error during login:", error);
            if (error.response) {
                setErrorMessage(error.response.data.erro ||
                    error.response.data.message ||
                    "Unknown error during login");
            }
            else if (error.request) {
                setErrorMessage("Unable to connect to the server. Please try again later.");
            }
            else {
                setErrorMessage("An error occurred when trying to log in. Please try again.");
            }
        },
    });
};
