import React, { ReactNode, useState } from "react";
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

type TextFieldGivemeProps = {
  icon?: ReactNode;
  placeholder?: string;
  title?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: "default" | "link" | "password"; // Agora "password" é uma opção
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function TextFieldGiveme({
  icon,
  placeholder,
  title,
  value,
  onChange,
  type = "default",
  onKeyDown,
}: TextFieldGivemeProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const TextFieldComponent =
    type === "link" ? StyledLinkTextField : StyledTextField;

  return (
    <div className="relative w-full">
      <p className="bg-white absolute px-2 bottom-9 z-[2] text-base left-4 font-medium">
        {title}
      </p>
      <TextFieldComponent
        id="outlined-basic"
        variant="outlined"
        type={
          type === "password" ? (showPassword ? "text" : "password") : "text"
        } // Altera o tipo dinamicamente
        placeholder={
          type === "default" || type === "password" ? placeholder : undefined
        }
        sx={{ width: "100%" }}
        value={value}
        onChange={
          type === "default" || type === "password" ? onChange : undefined
        }
        onKeyDown={onKeyDown}
        InputProps={{
          readOnly: type === "link",
          endAdornment: (
            <>
              {type === "password" && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}
              {type === "default" && icon && (
                <InputAdornment position="end">{icon}</InputAdornment>
              )}
            </>
          ),
          startAdornment:
            type === "link" ? (
              <InputAdornment position="start">
                <LinkIcon sx={{ color: "#919bf2" }} />
              </InputAdornment>
            ) : null,
        }}
      />
    </div>
  );
}
