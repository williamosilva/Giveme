import "./style.css";
import FileUpload from "./components/FileUpload";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Footer from "../../components/Footer";

export default function Form() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  return (
    <>
      <div className="grid grid-rows-3 gap-20 justify-center items-center w-full h-full p-6 relative z-[2]   ">
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
        <div className="w-full h-auto flex justify-center items-center ">
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
        <Footer />
      </div>
    </>
  );
}
