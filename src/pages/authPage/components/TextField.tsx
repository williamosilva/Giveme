import React, { ReactNode } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import LinkIcon from "@mui/icons-material/Link";

// Estilizando a TextField
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

// Estilizando a TextField para o modo link
const StyledLinkTextField = styled(StyledTextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#f5f6ff",
    borderRadius: 8,
    width: "100%",

    "& fieldset": {
      borderColor: "#d1deeb",
    },

    "&:hover fieldset": {
      borderColor: "#b0cce8",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #b0cce8",
    },
  },
  "& .MuiOutlinedInput-input": {
    color: "#919bf2",
    cursor: "default",
    paddingLeft: 4,
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
  type?: "default" | "link"; // Novo prop para definir o tipo
};

export default function TextFieldGiveme({
  icon,
  placeholder,
  title,
  value,
  onChange,
  type = "default", // Valor padrão é "default"
}: TextFieldGivemeProps) {
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
        placeholder={type === "default" ? placeholder : undefined}
        sx={{ width: "100%" }}
        value={value}
        onChange={type === "default" ? onChange : undefined}
        InputProps={{
          readOnly: type === "link",
          endAdornment:
            type === "default" && icon ? (
              <InputAdornment position="end">{icon}</InputAdornment>
            ) : null,
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
