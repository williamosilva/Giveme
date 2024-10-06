import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import icon from "../../../assets/icon.png";
const UploadContainer = styled(Box, {
    shouldForwardProp: (prop) => prop !== "isDragging",
})(({ isDragging }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    width: "637px",
    height: "300px",
    textAlign: "center",
    borderRadius: "16px",
    border: "2px dashed rgba(224, 224, 224, 0.5)",
    boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
    transition: "background-color 0.3s, background-image 0.3s",
    backgroundImage: isDragging
        ? "linear-gradient(135deg, #f2f4fc 0%, #FAFAFA 100%)"
        : "linear-gradient(135deg, #f2f4fc 0%, #FAFAFA 100%)",
    "&:hover": {
        backgroundColor: "#FFFDF5",
    },
    "@media (max-width: 684px)": {
        width: "100%",
    },
}));
const CustomFileLink = styled("span")({
    color: "#4747FF",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "color 0.3s",
    textDecoration: "none",
    "&:hover": {
        color: "#1b1b7a",
    },
});
const FileUpload = ({ onFileChange }) => {
    const [isDragging, setIsDragging] = useState(false);
    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = () => {
        setIsDragging(false);
    };
    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files?.[0] || null;
        onFileChange(file);
    };
    const handleFileChange = (event) => {
        const file = event.target.files?.[0] || null;
        onFileChange(file);
    };
    return (_jsxs(UploadContainer, { isDragging: isDragging, onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop, children: [_jsx("input", { accept: "*/*", style: { display: "none" }, id: "file-upload", type: "file", onChange: handleFileChange }), _jsx("div", { className: "w-12 h-12 ", children: _jsx("img", { src: icon, alt: "icon", className: "w-full h-full object-contain select-none pointer-events-none", draggable: "false" }) }), _jsx(Box, { sx: {
                    marginTop: "10px",
                    color: "#2b2a33",
                    fontSize: 16,
                    userSelect: "none",
                    "@media (max-width: 400px)": {
                        fontSize: 14,
                    },
                }, children: isDragging ? (_jsxs(_Fragment, { children: ["Drop the file here", _jsx("p", { className: "text-xs invisible", children: " oi" })] })) : (_jsxs(_Fragment, { children: ["Drag and Drop file here or", " ", _jsx("label", { htmlFor: "file-upload", children: _jsx(CustomFileLink, { children: "Choose File" }) }), _jsxs("p", { className: "text-xs text-[#6d6c75] mt-2", children: [" ", "Supported formats: MP4, PDF, JPG, PNG, MP3"] }), _jsx("p", { className: "text-xs text-[#6d6c75]", children: " File size limit: 4MB" })] })) })] }));
};
export default FileUpload;
