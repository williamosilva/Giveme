import React, { ReactNode } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

// Estilizando a TextField
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 16, // Arredonda os cantos
    "& fieldset": {
      borderColor: theme.palette.primary.main, // Cor da borda padrão
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.dark, // Cor da borda ao passar o mouse
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.light, // Cor da borda quando em foco
    },
  },
  "& .MuiInputLabel-root": {
    display: "none", // Esconde completamente o label
  },
  "& .MuiOutlinedInput-input": {
    padding: theme.spacing(1.5), // Aumenta o padding do input
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
      <p className="bg-white absolute  px-2 bottom-9 z-[2] left-2 font-medium ">
        {title}
      </p>
      <StyledTextField
        id="outlined-basic"
        variant="outlined"
        placeholder={placeholder} // Placeholder ao invés do label
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end">
                {icon ? icon : <SearchRoundedIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
