import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import error from "../../assets/404.svg";
import BackButton from "./components/BackButton";
export default function Error404() {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center h-screen", children: [_jsx("img", { src: error, alt: "404", className: "w-96" }), _jsx("h1", { className: "text-3xl font-bold text-gray-700 mb-16", children: "Sorry, page not found" }), _jsx(BackButton, {})] }));
}
