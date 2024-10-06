import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React imports
import { useState } from "react";
// Component imports
import TextFieldGiveme from "../../components/TextField";
import ButtonGiveme from "../../components/Button";
import Logo from "../../assets/logo.svg";
// MUI Icon imports
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
export default function Login({ registerRedirect, loginFunc, }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = () => {
        loginFunc({ email, password });
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };
    return (_jsxs("section", { className: "w-[100%] relative h-full grid grid-rows-4 grid-cols-1 items-start justify-between sm:p-12 p-5", children: [_jsx("div", { className: " w-20 h-20 rounded-xl items-center flex justify-center text-white font-medium", children: _jsx("img", { src: Logo, alt: "Logo", className: "w-[50%]  h-[50%] object-contain" }) }), _jsxs("div", { className: "flex flex-col justify-start gap-3 mb-12", children: [_jsx("h1", { className: "sm:text-6xl text-5xl font-black text-neutral-900", children: "Login" }), _jsxs("div", { className: "flex gap-1", children: [_jsx("p", { className: "text-base text-neutral-400", children: "Don't have an account?" }), _jsx("p", { className: "text-base text-[#4747FF] font-bold tracking-tight cursor-pointer hover:underline", onClick: registerRedirect, children: "Register" })] })] }), _jsxs("div", { className: "w-full gap-12 flex flex-col", children: [_jsx(TextFieldGiveme, { placeholder: "Enter your email...", title: "Email", icon: _jsx(EmailOutlinedIcon, {}), value: email, onChange: (e) => setEmail(e.target.value) }), _jsx(TextFieldGiveme, { placeholder: "Enter your password...", type: "password", title: "Password", icon: _jsx(VpnKeyRoundedIcon, {}), value: password, onChange: (e) => setPassword(e.target.value), onKeyDown: handleKeyDown })] }), _jsx("div", { className: "w-full h-full flex items-end", children: _jsx("div", { className: "w-full", children: _jsx(ButtonGiveme, { buttonText: "Login", onClick: handleLogin }) }) })] }));
}
