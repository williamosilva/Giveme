import { jsx as _jsx } from "react/jsx-runtime";
export default function ButtonGiveme({ buttonText, onClick, }) {
    return (_jsx("div", { children: _jsx("button", { className: "bg-[#4747FF] hover:bg-[#3636c0] transition-all duration-300 text-white font-bold py-4 px-4 rounded-xl w-full", onClick: onClick, children: buttonText }) }));
}
