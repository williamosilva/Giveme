import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";

const UploadContainer = styled(Box)<{ isDragging: boolean }>(
  ({ isDragging }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    width: "500px",
    height: "300px",
    textAlign: "center",
    transition: "background-color 0.3s",
    backgroundColor: isDragging ? "#e3e3ff" : "tranparent",
    backgroundImage:
      "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='33' ry='33' stroke='%231233db' stroke-width='5' stroke-dasharray='18%2c 18' stroke-dashoffset='29' stroke-linecap='butt'/%3e%3c/svg%3e\")",
    borderRadius: "33px",
  })
);

const UploadButton = styled(Button)({
  marginTop: "10px",
  padding: "16px 24px",
  borderRadius: "999px",
  backgroundColor: "#1A3DDC",
  color: "#fff",
  display: "flex",
  textTransform: "capitalize",
  alignItems: "center",
  textAlign: "center",
  lineHeight: "1",
  verticalAlign: "middle",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "#303f9f",
  },
});

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0] || null;
    onFileChange(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileChange(file);
  };

  return (
    <UploadContainer
      isDragging={isDragging}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        accept="*/*"
        style={{ display: "none" }}
        id="file-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <UploadButton variant="contained" component="span">
          Procurar Arquivo
        </UploadButton>
      </label>
      <Box sx={{ marginTop: "10px", color: "#555" }}>
        {isDragging
          ? "Solte o arquivo aqui"
          : "Arraste ou clique para selecionar um arquivo"}
      </Box>
    </UploadContainer>
  );
};

export default FileUpload;
