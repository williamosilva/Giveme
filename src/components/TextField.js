import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LinkIcon from "@mui/icons-material/Link";
const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-root": {
        borderRadius: 16,
        width: "100%",
        "& fieldset": {
            borderColor: "#bdbdbd",
        },
        "&:hover fieldset": {
            borderColor: "#9c9c9c",
        },
        "&.Mui-focused fieldset": {
            border: "1px solid #9c9c9c",
        },
    },
    "& .MuiInputLabel-root": {
        display: "none",
    },
    "& .MuiOutlinedInput-input": {
        padding: theme.spacing(1.5),
        color: "#333",
        fontSize: "14px",
        fontFamily: "Poppins",
        width: "100%",
        "&::placeholder": {
            color: "#888",
            opacity: 1,
            fontSize: "14px",
            fontFamily: "Poppins",
        },
    },
}));
const StyledLinkTextField = styled(StyledTextField)(({}) => ({
    "& .MuiOutlinedInput-root": {
        backgroundColor: "#f5f6ff",
        borderRadius: 8,
        width: "100%",
        cursor: "default",
        pointerEvents: "none",
        "& fieldset": {
            borderColor: "#d1deeb",
        },
        "&:hover fieldset": {
            borderColor: "#d1deeb",
        },
        "&.Mui-focused fieldset": {
            border: "1px solid #d1deeb",
        },
    },
    "& .MuiOutlinedInput-input": {
        color: "#919bf2",
        paddingLeft: 4,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        userSelect: "none",
        "&::selection": {
            backgroundColor: "transparent",
        },
    },
}));
export default function TextFieldGiveme({ icon, placeholder, title, value, onChange, type = "default", onKeyDown, }) {
    const [showPassword, setShowPassword] = useState(false);
    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    const TextFieldComponent = type === "link" ? StyledLinkTextField : StyledTextField;
    return (_jsxs("div", { className: "relative w-full", children: [_jsx("p", { className: "bg-white absolute px-2 bottom-9 z-[2] text-base left-4 font-medium rounded-full", children: title }), _jsx(TextFieldComponent, { variant: "outlined", type: type === "password" ? (showPassword ? "text" : "password") : "text", placeholder: type === "default" || type === "password" ? placeholder : undefined, sx: { width: "100%" }, value: value, onChange: type === "default" || type === "password" ? onChange : undefined, onKeyDown: onKeyDown, InputProps: {
                    readOnly: type === "link",
                    endAdornment: (_jsxs(_Fragment, { children: [type === "password" && (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { onClick: handleTogglePasswordVisibility, edge: "end", children: showPassword ? _jsx(VisibilityOff, {}) : _jsx(Visibility, {}) }) })), type === "default" && icon && (_jsx(InputAdornment, { position: "end", children: icon }))] })),
                    startAdornment: type === "link" ? (_jsx(InputAdornment, { position: "start", children: _jsx(LinkIcon, { sx: { color: "#919bf2" } }) })) : null,
                } })] }));
}
