import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
}

interface RegisterResponse {
  message: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
}

interface RegisterError {
  erro?: string;
  message?: string;
}

export const useRegisterMutation = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const mutation = useMutation<
    RegisterResponse,
    AxiosError<RegisterError>,
    RegisterData
  >({
    mutationFn: ({ name, email, password, confirmpassword }) => {
      return axios
        .post<RegisterResponse>("http://localhost:3000/auth/register", {
          name,
          email,
          password,
          confirmpassword,
        })
        .then((res) => {
          console.log("Response data:", res.data);
          localStorage.setItem("userId", res.data.userId);
          return res.data;
        });
    },
    onSuccess: (data) => {
      console.log("Data successfully posted:", data);
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
    onError: (error: AxiosError<RegisterError>) => {
      console.error("Error during mutation:", error);
      if (error.response) {
        // O servidor respondeu com um status fora do intervalo 2xx
        setErrorMessage(
          error.response.data.erro ||
            error.response.data.message ||
            "Unknown error during registration"
        );
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        setErrorMessage(
          "Unable to connect to the server. Please try again later."
        );
      } else {
        // Algo aconteceu na configuração da requisição que causou o erro
        setErrorMessage(
          "An error occurred while trying to register. Please try again."
        );
      }
    },
  });

  return { mutation, errorMessage };
};
