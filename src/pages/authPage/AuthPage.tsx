// Component imports
import Footer from "../../components/Footer";
import Register from "./Register";
import Login from "./Login";
import { StyledSnackbar } from "../../components/StyledSnackbar";

// Asset imports
import Photo from "../../assets/perfil.jpg";
import Background from "../../assets/background.png";

// React imports
import { useState, useEffect, useContext } from "react";

// Context imports
import { AuthContext } from "../../contexts/AuthContext";

// Hook imports
import { useLoginMutation } from "../../hooks/useLoginMutation";
import { useRegisterMutation } from "../../hooks/useRegisterMutation";

// MUI Icon imports
import WavingHandRoundedIcon from "@mui/icons-material/WavingHandRounded";
import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [registerError, setRegisterError] = useState<string | null>(null);

  const auth = useContext(AuthContext);

  const { mutation: registerMutation, errorMessage: registerErrorMessage } =
    useRegisterMutation();

  useEffect(() => {
    if (auth?.justLoggedOut) {
      const timer = setTimeout(() => {
        auth.clearLogoutIndicator();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [auth?.justLoggedOut]);

  function handleClick() {
    setIsLogin(!isLogin);
  }

  const handleCloseSnackbar = () => {
    auth?.clearLogoutIndicator();
    setLoginError(null);
  };

  const performRegister = (registerData: any) => {
    registerMutation.mutate(registerData, {
      onError: (error) => {
        setRegisterError(
          error.response?.data?.erro || "Erro ao fazer Registro"
        );
      },
    });
  };

  const { mutate: handleLogin, error: loginMutationError } = useLoginMutation();

  const performLogin = (loginData: any) => {
    handleLogin(loginData, {
      onError: (error) => {
        setLoginError(error.response?.data?.erro || "Erro ao fazer login");
      },
    });
  };

  useEffect(() => {
    if (loginMutationError) {
      setLoginError(
        loginMutationError.response?.data?.erro || "Erro ao fazer login"
      );
    }
  }, [loginMutationError]);

  useEffect(() => {
    if (registerErrorMessage) {
      setRegisterError(registerErrorMessage);
    }
  }, [registerErrorMessage]);

  return (
    <>
      <StyledSnackbar
        open={auth?.justLoggedOut || false}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={
          <div className="flex gap-3 justify-center items-center">
            <WavingHandRoundedIcon fontSize="small" sx={{ color: "#4747FF" }} />
            <p className="align-middle leading-none pt-[4px] ">See you soon!</p>
          </div>
        }
      />
      <StyledSnackbar
        open={!!loginError}
        autoHideDuration={6000}
        onClose={() => setLoginError(null)}
        message={
          <div className="flex gap-2 justify-center items-center">
            <PriorityHighRoundedIcon
              fontSize="small"
              sx={{ color: "#4747FF" }}
            />
            <p className="align-middle leading-none">{loginError}</p>
          </div>
        }
      />
      <StyledSnackbar
        open={!!registerError}
        autoHideDuration={6000}
        onClose={() => setLoginError(null)}
        message={
          <div className="flex gap-2 justify-center items-center">
            <PriorityHighRoundedIcon
              fontSize="small"
              sx={{ color: "#4747FF" }}
            />
            <p className="align-middle leading-none">{registerError}</p>
          </div>
        }
      />

      <div className="flex flex-col h-full items-center">
        <div className="h-full flex items-center">
          <main className="lg:w-[1000px]  sm:w-[600px] w-[400px] relative h-[700px] gap-0 p-3 bg-white flex items-center justify-center rounded-3xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
            <div className="relative lg:w-[50%] w-full h-full">
              <div
                className={`absolute inset-0 transition-all duration-300 ${
                  isLogin
                    ? "opacity-100  translate-x-0 "
                    : "opacity-0 -translate-x-3 "
                }`}
                style={{ pointerEvents: isLogin ? "auto" : "none" }}
              >
                <Login
                  registerRedirect={handleClick}
                  loginFunc={performLogin}
                />
              </div>
              <div
                className={`absolute inset-0 transition-all duration-300 ${
                  !isLogin
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-3"
                }`}
                style={{ pointerEvents: !isLogin ? "auto" : "none" }}
              >
                <Register
                  loginRedirect={handleClick}
                  registerFunc={performRegister}
                />
              </div>
            </div>

            <section className="flex-1 w-[50%] relative h-full rounded-2xl overflow-hidden lg:block hidden">
              <img src={Background} className="object-cover h-full w-full" />
            </section>

            <section className="absolute  flex lg:top-16 lg:left-[36.2%]   sm:top-16 sm:right-16 top-8 right-6 transform[translate(-50%, -50%)]">
              <div className="flex flex-col justify-center">
                <p className="text-base text-neutral-400">Need Help?</p>
                <a
                  href="https://williamoliveirasilva.online/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="text-base text-[#4747FF] font-bold tracking-tight hover:text-[#13134a] transition-all duration-300">
                    Contact Me!
                  </p>
                </a>
              </div>
              <div className="w-20 h-20 bg-white p-2 rounded-full">
                <img
                  alt=""
                  className="w-full h-full object-contain rounded-full"
                  src={Photo}
                />
              </div>
            </section>
          </main>
        </div>
        <div className=" flex-col flex justify-end pb-6">
          <Footer />
        </div>
      </div>
    </>
  );
}
