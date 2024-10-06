import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
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
    const [loginError, setLoginError] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const auth = useContext(AuthContext);
    const { mutation: registerMutation, errorMessage: registerErrorMessage } = useRegisterMutation();
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
    const performRegister = (registerData) => {
        registerMutation.mutate(registerData, {
            onError: (error) => {
                setRegisterError(error.response?.data?.erro || "Erro ao fazer Registro");
            },
        });
    };
    const { mutate: handleLogin, error: loginMutationError } = useLoginMutation();
    const performLogin = (loginData) => {
        handleLogin(loginData, {
            onError: (error) => {
                setLoginError(error.response?.data?.erro || "Erro ao fazer login");
            },
        });
    };
    useEffect(() => {
        if (loginMutationError) {
            setLoginError(loginMutationError.response?.data?.erro || "Erro ao fazer login");
        }
    }, [loginMutationError]);
    useEffect(() => {
        if (registerErrorMessage) {
            setRegisterError(registerErrorMessage);
        }
    }, [registerErrorMessage]);
    return (_jsxs(_Fragment, { children: [_jsx(StyledSnackbar, { open: auth?.justLoggedOut || false, autoHideDuration: 6000, onClose: handleCloseSnackbar, message: _jsxs("div", { className: "flex gap-3 justify-center items-center", children: [_jsx(WavingHandRoundedIcon, { fontSize: "small", sx: { color: "#4747FF" } }), _jsx("p", { className: "align-middle leading-none pt-[4px] ", children: "See you soon!" })] }) }), _jsx(StyledSnackbar, { open: !!loginError, autoHideDuration: 6000, onClose: () => setLoginError(null), message: _jsxs("div", { className: "flex gap-2 justify-center items-center", children: [_jsx(PriorityHighRoundedIcon, { fontSize: "small", sx: { color: "#4747FF" } }), _jsx("p", { className: "align-middle leading-none", children: loginError })] }) }), _jsx(StyledSnackbar, { open: !!registerError, autoHideDuration: 6000, onClose: () => setLoginError(null), message: _jsxs("div", { className: "flex gap-2 justify-center items-center", children: [_jsx(PriorityHighRoundedIcon, { fontSize: "small", sx: { color: "#4747FF" } }), _jsx("p", { className: "align-middle leading-none", children: registerError })] }) }), _jsxs("div", { className: "flex flex-col h-full items-center", children: [_jsx("div", { className: "h-full flex items-center", children: _jsxs("main", { className: "lg:w-[1000px]  sm:w-[600px] w-[400px] relative h-[700px] gap-0 p-3 bg-white flex items-center justify-center rounded-3xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]", children: [_jsxs("div", { className: "relative lg:w-[50%] w-full h-full", children: [_jsx("div", { className: `absolute inset-0 transition-all duration-300 ${isLogin
                                                ? "opacity-100  translate-x-0 "
                                                : "opacity-0 -translate-x-3 "}`, style: { pointerEvents: isLogin ? "auto" : "none" }, children: _jsx(Login, { registerRedirect: handleClick, loginFunc: performLogin }) }), _jsx("div", { className: `absolute inset-0 transition-all duration-300 ${!isLogin
                                                ? "opacity-100 translate-x-0"
                                                : "opacity-0 -translate-x-3"}`, style: { pointerEvents: !isLogin ? "auto" : "none" }, children: _jsx(Register, { loginRedirect: handleClick, registerFunc: performRegister }) })] }), _jsx("section", { className: "flex-1 w-[50%] relative h-full rounded-2xl overflow-hidden lg:block hidden", children: _jsx("img", { src: Background, className: "object-cover h-full w-full" }) }), _jsxs("section", { className: "absolute  flex lg:top-16 lg:left-[36.2%]   sm:top-16 sm:right-16 top-8 right-6 transform[translate(-50%, -50%)]", children: [_jsxs("div", { className: "flex flex-col justify-center", children: [_jsx("p", { className: "text-base text-neutral-400", children: "Need Help?" }), _jsx("a", { href: "https://williamoliveirasilva.online/", target: "_blank", rel: "noopener noreferrer", children: _jsx("p", { className: "text-base text-[#4747FF] font-bold tracking-tight hover:text-[#13134a] transition-all duration-300", children: "Contact Me!" }) })] }), _jsx("div", { className: "w-20 h-20 bg-white p-2 rounded-full", children: _jsx("img", { alt: "", className: "w-full h-full object-contain rounded-full", src: Photo }) })] })] }) }), _jsx("div", { className: " flex-col flex justify-end pb-6", children: _jsx(Footer, {}) })] })] }));
}
