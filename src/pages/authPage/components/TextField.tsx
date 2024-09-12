import React, { ReactNode } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

// Estilizando a TextField
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 16, // Arredonda os cantos
    width: "100%", // Largura do input
    "& fieldset": {
      borderColor: "#bdbdbd", // Cor da borda padrão
    },
    "&:hover fieldset": {
      borderColor: "#9c9c9c", // Cor da borda ao passar o mouse
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #9c9c9c", // Espessura da borda
    },
  },
  "& .MuiInputLabel-root": {
    display: "none", // Esconde completamente o label
  },
  "& .MuiOutlinedInput-input": {
    padding: theme.spacing(1.5), // Aumenta o padding do input
    color: "#333", // Cor do texto digitado
    fontSize: "14px", // Tamanho da fonte do texto digitado
    fontFamily: "Poppins", // Fonte do placeholders
    width: "100%", // Largura do input

    "&::placeholder": {
      color: "#888", // Cor do placeholder
      opacity: 1, // Opacidade do placeholder
      fontSize: "14px", // Tamanho da fonte do placeholder
      fontFamily: "Poppins", // Fonte do placeholders
    },
  },
}));

type TextFieldGivemeProps = {
  icon?: ReactNode;
  placeholder?: string;
  title?: string;
};

export default function TextFieldGiveme({
  icon,
  placeholder,
  title,
}: TextFieldGivemeProps) {
  return (
    <div className="relative">
      <p className="bg-white absolute  px-2 bottom-9 z-[2] text-base left-4 font-medium ">
        {title}
      </p>
      <StyledTextField
        id="outlined-basic"
        variant="outlined"
        placeholder={placeholder}
        sx={{ width: "100%" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <span>{icon ? icon : <SearchRoundedIcon />}</span>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
