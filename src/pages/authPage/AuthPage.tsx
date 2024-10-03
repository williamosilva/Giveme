import Footer from "../../components/Footer";
import Photo from "../../assets/perfil.jpg";
import Background from "../../assets/gato.jpg";
import Register from "./Register";
import Login from "./Login";
import { useState } from "react";

import { useRegisterMutation } from "../../hooks/useRegisterMutation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  function handleClick() {
    setIsLogin(!isLogin);
  }

  const {
    mutate: handleRegister,
    isLoading: isRegistering,
    isSuccess: isRegistered,
  } = useRegisterMutation();

  const consolelog = (email: string, password: string) => {
    console.log(email, password);
  };

  return (
    <div className="flex flex-col h-full items-center">
      <div className="h-full flex items-center">
        <main className="lg:w-[1000px]  sm:w-[600px] w-[400px] relative h-[700px] gap-0 p-3 bg-white flex items-center justify-center rounded-3xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
          {/* Wrapper para aplicar a transição */}
          <div className="relative lg:w-[50%] w-full h-full">
            <div
              className={`absolute inset-0 transition-all duration-300 ${
                isLogin
                  ? "opacity-100  translate-x-0 "
                  : "opacity-0 -translate-x-3 "
              }`}
              style={{ pointerEvents: isLogin ? "auto" : "none" }}
            >
              <Login registerRedirect={handleClick} loginFunc={consolelog} />
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
                registerFunc={handleRegister}
              />
            </div>
          </div>

          <section className="flex-1 w-[50%] relative h-full rounded-2xl overflow-hidden lg:block hidden ">
            <img src={Background} className="object-cover h-full w-full" />
          </section>

          <section className="absolute  flex lg:top-16 lg:left-[36.2%]   sm:top-16 sm:right-16 top-8 right-6 transform[translate(-50%, -50%)]">
            <div className="flex flex-col justify-center">
              <p className="text-base text-neutral-400">Need Help?</p>
              <p className="text-base text-[#4747FF] font-bold tracking-tight">
                Contact Me!
              </p>
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
      <div className="pb-10">
        <Footer />
      </div>
    </div>
  );
}
