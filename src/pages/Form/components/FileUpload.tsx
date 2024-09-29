import React, { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import icon from "../../../assets/icon.png";

const UploadContainer = styled(Box)<{ isDragging: boolean }>(
  ({ isDragging }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    width: "637px",
    height: "300px",
    textAlign: "center",
    borderRadius: "16px",
    border: "2px dashed rgba(224, 224, 224, 0.5)",
    boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
    transition: "background-color 0.3s, background-image 0.3s",
    backgroundImage: isDragging
      ? "linear-gradient(135deg, #f2f4fc 0%, #FAFAFA 100%)"
      : "linear-gradient(135deg, #f2f4fc 0%, #FAFAFA 100%)",
    "&:hover": {
      backgroundColor: "#FFFDF5",
    },

    "@media (max-width: 684px)": {
      width: "100%",
    },
  })
);

const CustomFileLink = styled("span")({
  color: "#4747FF",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "color 0.3s",
  textDecoration: "none",
  "&:hover": {
    color: "#1b1b7a",
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
      <div className="w-12 h-12">
        <img src={icon} alt="icon" className="w-full h-full object-contain" />
      </div>

      <Box
        sx={{
          marginTop: "10px",
          color: "#2b2a33",
          fontSize: 16,

          "@media (max-width: 400px)": {
            fontSize: 14,
          },
        }}
      >
        {isDragging ? (
          <>
            Drop the file here
            <p className="text-xs invisible"> oi</p>
          </>
        ) : (
          <>
            Drag and Drop file here or{" "}
            <label htmlFor="file-upload">
              <CustomFileLink>Choose File</CustomFileLink>
            </label>
            <p className="text-xs text-[#6d6c75]">
              {" "}
              Supported formats: MP4, PDF, JPG, PNG, MP3
            </p>
          </>
        )}
      </Box>
    </UploadContainer>
  );
};

export default FileUpload;
