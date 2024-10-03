import axios from "axios";
import { useMutation } from "react-query";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const useRegisterMutation = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({
      name,
      email,
      password,
      confirmpassword,
    }: {
      name: string;
      email: string;
      password: string;
      confirmpassword: string;
    }) => {
      return axios
        .post("http://localhost:3000/auth/register", {
          name,
          email,
          password,
          confirmpassword,
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
      console.log("Data successfully posted:", data);

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
      console.error("Error during mutation:", error);
    },
  });
};
