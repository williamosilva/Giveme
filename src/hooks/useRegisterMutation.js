import { useMutation } from "react-query";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "@services/ApiService";
export const useRegisterMutation = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const mutation = useMutation({
        mutationFn: async (registerData) => {
            const response = await api.post("/auth/register", registerData);
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
            console.error("Error during registration:", error);
            if (error.response) {
                setErrorMessage(error.response.data.erro ||
                    error.response.data.message ||
                    "Unknown error during registration");
            }
            else if (error.request) {
                setErrorMessage("Unable to connect to the server. Please try again later.");
            }
            else {
                setErrorMessage("An error occurred while trying to register. Please try again.");
            }
        },
    });
    return { mutation, errorMessage };
};
