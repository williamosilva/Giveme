import axios from "axios";
import { useMutation } from "react-query";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const useLoginMutation = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return axios
        .post("http://localhost:3000/auth/login", {
          email,
          password,
        })
        .then((res) => {
          console.log("Response data:", res.data);
          return res.data;
        })
        .catch((error) => {
          console.error("Error:", error);
          throw error;
        });
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);

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
    },
  });
};
