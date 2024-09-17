import "./style.css";
import FileUpload from "./components/FileUpload";
import { useState } from "react";
import { Box, Typography } from "@mui/material";

export default function Form() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  return (
    <div className="flex justify-between items-center w-full h-full p-20">
      <div className="flex flex-col items-start w-full h-full justify-center">
        {/* <h1 className="font-semibold text-6xl mb-10">Giveme</h1> */}

        <h1
          className="font-normal font-Raleway leading-tight text-6xl text-transparent bg-clip-text animate-gradient"
          style={{
            backgroundImage:
              "linear-gradient(270deg, #668aff, #4747FF, #668aff)",
            backgroundSize: "400% 400%",
          }}
        >
          Compartilhe imagens
        </h1>
        <h1
          className="font-normal leading-tight  font-Raleway text-[5rem] text-transparent bg-clip-text animate-gradient"
          style={{
            backgroundImage:
              "linear-gradient(270deg, #4747FF, #7979bd, #4747FF)",
            backgroundSize: "400% 400%",
          }}
        >
          de forma rápida
        </h1>
      </div>
      <div className="w-full h-full flex justify-center items-center p-24">
        <Box sx={{ width: "auto", margin: "0 auto", textAlign: "center" }}>
          {/* <Typography variant="h6" sx={{ marginBottom: "10px" }}>
            Upload de Arquivo
          </Typography> */}

          {/* Componente de Upload de Arquivo */}
          <FileUpload onFileChange={handleFileChange} />

          {/* Exibição de nome e tamanho do arquivo */}
          {file && (
            <Box sx={{ marginTop: "20px" }}>
              <Typography variant="body1">
                <strong>Nome:</strong> {file.name}
              </Typography>
              <Typography variant="body1">
                <strong>Tamanho:</strong> {(file.size / 1024).toFixed(2)} KB
              </Typography>
            </Box>
          )}
        </Box>
      </div>
    </div>
  );
}
