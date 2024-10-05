import { Snackbar } from "@mui/material";
import styled from "styled-components";

export const StyledSnackbar = styled(Snackbar)(() => ({
  "& .MuiSnackbarContent-root": {
    backgroundColor: "#F4F5FB",
    color: "#363532",
    fontSize: "16px",

    minWidth: "180px",
    padding: "8px, 16px",
    borderRadius: "8px",
    boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2)",
  },
}));
