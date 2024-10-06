import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CallMadeRoundedIcon from "@mui/icons-material/CallMadeRounded";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { IconButton } from "@mui/material";
import { useDeleteFile } from "../../../../hooks/useFile";
import "./style.css";
export default function CardLink({ link, date, fileId, onDeleteSuccess, }) {
    const { mutate } = useDeleteFile();
    const handleCopyLink = () => {
        navigator.clipboard.writeText(link);
    };
    const handleDelete = (fileId) => {
        mutate(fileId, {
            onSuccess: () => {
                onDeleteSuccess();
            },
        });
    };
    return (_jsxs("div", { className: "relative p-4 w-full max-w-[640px] h-auto mx-auto rounded-2xl overflow-hidden shadow border-snake flex bg-white", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-[#ffffff] via-[#fdfcfe] to-[#fcfcfe] opacity-100 animate-moving-lights" }), _jsxs("div", { className: "relative z-10 flex overflow-hidden overflow-x-auto justify-between items-center w-full", children: [_jsxs("div", { className: "flex items-center gap-4 flex-grow min-w-0", children: [_jsx("div", { className: "w-12 h-12 flex items-center justify-center rounded-full bg-neutral-100 shadow-sm flex-shrink-0", children: _jsx("p", { className: "font-DM text-blue-500 text-base", children: "G" }) }), _jsxs("div", { className: "flex-grow min-w-0 overflow-hidden", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("h2", { className: "truncate text-base text-[#9299bc] font-medium flex-grow min-w-0", children: link }), _jsx(IconButton, { size: "small", className: "flex-shrink-0", onClick: handleCopyLink, children: _jsx(ContentCopyRoundedIcon, { fontSize: "small", sx: { color: "#9992bc", opacity: 0.8 } }) })] }), _jsx("p", { className: "truncate text-sm text-neutral-400 font-medium", children: date })] })] }), _jsxs("div", { className: "flex justify-end gap-2 ml-4", children: [_jsx(IconButton, { className: "flex-shrink-0", onClick: () => handleDelete(fileId), children: _jsx(DeleteOutlineOutlinedIcon, { sx: { color: "#9992bc" } }) }), _jsx("a", { href: link, target: "_blank", rel: "noreferrer noopener", children: _jsx(IconButton, { className: "flex-shrink-0", children: _jsx(CallMadeRoundedIcon, { sx: { color: "#9992bc" } }) }) })] })] })] }));
}
