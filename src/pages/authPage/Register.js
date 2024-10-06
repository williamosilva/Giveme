import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React imports
import React from "react";
// Component imports
import TextFieldGiveme from "../../components/TextField";
import ButtonGiveme from "../../components/Button";
import Logo from "../../assets/logo.svg";
// MUI Icon imports
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
export default function Register({ loginRedirect, registerFunc, }) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [confirmpassword, setConfirmpassword] = React.useState("");
    const handleRegister = () => {
        registerFunc({ name, email, password, confirmpassword });
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleRegister();
        }
    };
    return (_jsxs("section", { className: "w-[100%] relative h-full grid grid-rows-4 grid-cols-1 items-start justify-between sm:p-12 p-5", children: [_jsx("div", { className: "h-full flex items-start w-full", children: _jsx("div", { className: " w-20 h-20 rounded-xl items-center flex justify-center text-white font-medium", children: _jsx("img", { src: Logo, alt: "Logo", className: "w-[50%]  h-[50%] object-contain" }) }) }), _jsxs("div", { className: "flex flex-col justify-start gap-3 h-full w-full", children: [_jsx("h1", { className: "sm:text-6xl  text-5xl font-black text-neutral-900", children: "Register" }), _jsxs("div", { className: "flex gap-1", children: [_jsx("p", { className: "text-base text-neutral-40 0", children: "Already registered?" }), _jsx("p", { className: "text-base text-[#4747FF] font-bold tracking-tight cursor-pointer hover:underline", onClick: loginRedirect, children: "Sign in now" })] })] }), _jsxs("div", { className: "w-full gap-7 flex flex-col h-full", children: [_jsx(TextFieldGiveme, { placeholder: "Enter your user...", title: "User", icon: _jsx(PersonOutlineOutlinedIcon, {}), onChange: (e) => setName(e.target.value) }), _jsx(TextFieldGiveme, { placeholder: "Enter your email...", title: "Email", icon: _jsx(EmailOutlinedIcon, {}), onChange: (e) => {
                            setEmail(e.target.value);
                        } }), _jsx(TextFieldGiveme, { placeholder: "Enter your password...", title: "Password", icon: _jsx(VpnKeyRoundedIcon, {}), type: "password", onChange: (e) => {
                            setPassword(e.target.value);
                            setConfirmpassword(e.target.value);
                        }, onKeyDown: handleKeyDown })] }), _jsx("div", { className: "w-full h-full flex items-end", children: _jsx("div", { className: "w-full", children: _jsx(ButtonGiveme, { buttonText: "Register", onClick: handleRegister }) }) })] }));
}
