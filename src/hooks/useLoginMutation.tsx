import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface LoginResponse {
  userId: string;
  accessToken: string;
  refreshToken: string;
  message: string;
}

interface LoginError {
  erro?: string;
  message?: string;
}

export const useLoginMutation = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return useMutation<
    LoginResponse,
    AxiosError<LoginError>,
    { email: string; password: string }
  >({
    mutationFn: ({ email, password }) => {
      return axios
        .post<LoginResponse>("http://localhost:3000/auth/login", {
          email,
          password,
        })
        .then((res) => {
          // console.log("Response data do login:", res.data);
          // console.log("id", res.data.userId);
          localStorage.setItem("userId", res.data.userId);
          return res.data;
        });
    },
    onSuccess: (data) => {
      // console.log("Login successful:", data);
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
    onError: (error: AxiosError<LoginError>) => {
      console.error("Error during login:", error);
      if (error.response) {
        // O servidor respondeu com um status fora do intervalo 2xx
        setErrorMessage(
          error.response.data.erro ||
            error.response.data.message ||
            "Unknown error during login"
        );
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        setErrorMessage(
          "Unable to connect to the server. Please try again later."
        );
      } else {
        // Algo aconteceu na configuração da requisição que causou o erro
        setErrorMessage(
          "An error occurred when trying to log in. Please try again."
        );
      }
    },
  });
};
