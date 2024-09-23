import "./style.css";
import FileUpload from "./components/FileUpload";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Footer from "../../components/Footer";
import jpg from "../../assets/jpg.svg";
import mp3 from "../../assets/mp3.svg";
import mp4 from "../../assets/mp4.svg";
import pdf from "../../assets/pdf.svg";
import png from "../../assets/png.svg";

export default function Form() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-full p-6 relative z-[2]   ">
        <div className="flex flex-col items-center w-full h-fit justify-center  ">
          <h1
            className="font-medium font-DM leading-none text-9xl text-transparent bg-clip-text animate-gradient"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #668aff, #4747FF, #668aff)",
              backgroundSize: "400% 400%",
            }}
          >
            Giveme
          </h1>
          <h1
            className="font-normal leading-tight  font-Sora text-[1.72rem] text-transparent bg-clip-text animate-gradient"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #4747FF, #7979bd, #4747FF)",
              backgroundSize: "400% 400%",
            }}
          >
            Share files easily and quickly
          </h1>
        </div>
        <div className="w-full h-full flex justify-center items-center ">
          <Box sx={{ width: "auto", margin: "0 auto", textAlign: "center" }}>
            {/* <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Upload de Arquivo
          </Typography> */}

            {/* Componente de Upload de Arquivo */}

            <FileUpload onFileChange={handleFileChange} />

            {/* Exibição de nome e tamanho do arquivo */}
            {file && (
              <Box className="boxFile">
                <div className="flex gap-5 items-center">
                  <div className="w-8 h-8">
                    <img src={jpg} className="w-full object-contain" />
                  </div>
                  <div className="flex flex-col w-auto">
                    <h4 className="text-base font-medium text-[#6d6c75]">
                      {file.name}
                    </h4>
                    <h4 className="text-sm text-end font-regular text-[#6d6c75]">
                      {(file.size / 1024).toFixed(2)} KB
                    </h4>
                  </div>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    marginTop: "10px",
                    backgroundColor: "#FFFFFF", // Cor de fundo branca
                    color: "#000000", // Cor do texto preta
                    borderRadius: "8px",
                    boxShadow: "none",
                    border: "1px solid #cccc", // Borda preta
                    "&:hover": {
                      backgroundColor: "#f0f0f0", // Cor de fundo ao passar o mouse
                    },
                  }}
                >
                  Enviar
                </Button>
              </Box>
            )}
          </Box>
        </div>
        <Footer />
      </div>
    </>
  );
}
