import React, { useEffect, useState } from "react";
import axios from "axios";

// Component imports
import TextFieldGiveme from "@components/TextField";
import ButtonGiveme from "@components/Button";
import Logo from "@assets/Logo.svg";

// MUI Icon imports
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

export default function Login({
  registerRedirect,
  loginFunc,
}: {
  registerRedirect: (event: React.MouseEvent<HTMLParagraphElement>) => void;
  loginFunc: ({ email, password }: { email: string; password: string }) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [tokens, setTokens] = useState(null);
  const [error, setError] = useState<string | null>(null); // Modificado para aceitar string ou null
  const [buttonToken] = useState(true);

  const handleLogin = () => {
    loginFunc({ email, password });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      setAuthCode(code);
      handleSubmitAuthCode(code);
    }
  }, []);

  const handleGetAuthUrl = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/google/getAuthUrl"
      );
      window.location.href = response.data.url; // Redireciona para a URL de autenticação
    } catch (error: any) {
      // Modificado para tratar 'error' como 'any'
      console.error("Erro ao obter URL de autenticação:", error);
      setError("Erro ao obter URL de autenticação");
    }
  };

  const handleSubmitAuthCode = async (code = authCode) => {
    try {
      console.log("Enviando código:", code);
      const response = await axios.post(
        "http://localhost:3000/google/handleCallback",
        { code }
      );
      setTokens(response.data);
      console.log("Tokens recebidos:", response.data);
      setError(null);
    } catch (error: any) {
      // Modificado para tratar 'error' como 'any'
      console.error("Erro ao processar código de autenticação:", error);
      setError(
        error?.response?.data?.error ||
          "Erro ao processar código de autenticação"
      );
    }
  };

  return (
    <section className="w-[100%] relative h-full grid grid-rows-4 grid-cols-1 items-start justify-between sm:p-12 p-5">
      <div className=" w-20 h-20 rounded-xl items-center flex justify-center text-white font-medium">
        <img
          src={Logo}
          alt="Logo"
          className="w-[50%]  h-[50%] object-contain"
        />
      </div>
      <div className="flex flex-col justify-start gap-3 mb-12">
        <h1 className="sm:text-6xl text-5xl font-black text-neutral-900">
          Login
        </h1>
        <div className="flex gap-1">
          <p className="text-base text-neutral-400">Don't have an account?</p>
          <p
            className="text-base text-[#4747FF] font-bold tracking-tight cursor-pointer hover:underline"
            onClick={registerRedirect}
          >
            Register
          </p>
        </div>
      </div>
      <div className="w-full gap-12 flex flex-col">
        <TextFieldGiveme
          placeholder="Enter your email..."
          title="Email"
          icon={<EmailOutlinedIcon />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextFieldGiveme
          placeholder="Enter your password..."
          type={"password"}
          title="Password"
          icon={<VpnKeyRoundedIcon />}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="w-full h-full flex items-end">
        <div className="w-full">
          <ButtonGiveme buttonText="Login" onClick={handleLogin} />
        </div>
        {buttonToken && (
          <div>
            <button onClick={handleGetAuthUrl}>
              Iniciar Autenticação Google
            </button>
            <br />
            <input
              type="text"
              value={authCode}
              onChange={(e) => setAuthCode(e.target.value)}
              placeholder="Código de autenticação"
            />
            <button onClick={() => handleSubmitAuthCode()}>
              Enviar Código
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {tokens && (
              <div>
                <h3>Tokens Recebidos:</h3>
                <pre>{JSON.stringify(tokens, null, 2)}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
