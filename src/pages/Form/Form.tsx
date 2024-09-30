import React, { useState, useEffect } from "react";
import "./style.css";
import FileUpload from "./components/FileUpload";
import { Box, Button, Snackbar } from "@mui/material";
import Footer from "../../components/Footer";
import jpg from "../../assets/jpg.svg";
import TextFieldGiveme from "../authPage/components/TextField";
import StyledButton from "./components/StyledButton";
import Dots from "./components/Dot";
import mp3 from "../../assets/mp3.svg";
import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";
import mp4 from "../../assets/mp4.svg";
import pdf from "../../assets/pdf.svg";
import png from "../../assets/png.svg";
import styled from "styled-components";

const allowedFileTypes = [
  "image/jpeg",
  "image/png",
  "audio/mpeg",
  "video/mp4",
  "application/pdf",
];

const getFileIcon = (fileType: any) => {
  switch (fileType) {
    case "image/jpeg":
      return jpg;
    case "image/png":
      return png;
    case "audio/mpeg":
      return mp3;
    case "video/mp4":
      return mp4;
    case "application/pdf":
      return pdf;
    default:
      return jpg;
  }
};

export default function Form() {
  const [file, setFile] = useState<File | null>(null);
  const [inputValue, setInputValue] = useState("aaa");
  const [trigger, setTrigger] = useState(true);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  // const [fileLimit, setFileLimit] = useState(0);

  const StyledSnackbar = styled(Snackbar)(() => ({
    "& .MuiSnackbarContent-root": {
      backgroundColor: "#F4F5FB",
      color: "#363532",
      fontSize: "16px",
      padding: "8px, 16px",
      borderRadius: "8px",
      boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.2)",
    },
  }));

  const handleFileChange = (selectedFile: any) => {
    if (selectedFile && allowedFileTypes.includes(selectedFile.type)) {
      setFile(selectedFile);
      console.log("File type:", selectedFile.type);
    } else {
      setFile(null);
      handleOpen();
    }
  };

  const handleCopy = () => {
    console.log("Text copied!");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <StyledSnackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={
          <div className="flex gap-2 justify-center items-center">
            <PriorityHighRoundedIcon
              fontSize="small"
              sx={{ color: "#4747FF" }}
            />
            <p className="align-middle leading-none ">Unsupported file type</p>
          </div>
        }
      />
      <StyledSnackbar
        open={false}
        autoHideDuration={6000}
        onClose={handleClose}
        message={
          <div className="flex gap-2 justify-center items-center">
            <PriorityHighRoundedIcon
              fontSize="small"
              sx={{ color: "#4747FF" }}
            />
            <p className="align-middle leading-none ">
              Upload limit reached! Delete any of your files to continue...
            </p>
          </div>
        }
      />
      <div className="flex flex-col justify-center items-center w-full h-full p-6 relative z-[2] gap-2">
        <div className="flex flex-col items-center w-full h-fit justify-center">
          <h1
            className="font-medium font-DM leading-none sm:text-9xl  text-8xl text-transparent bg-clip-text animate-gradient"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #668aff, #4747FF, #668aff)",
              backgroundSize: "400% 400%",
            }}
          >
            Giveme
          </h1>
          {/* <button onClick={() => setTrigger((previousState) => !previousState)}>
            oii
          </button>
          <button onClick={() => setLoading((previousState) => !previousState)}>
            oiiss
          </button> */}
          <h1
            className="font-normal leading-tight font-Sora sm:text-[1.72rem]  text-[1.38rem] text-transparent bg-clip-text animate-gradient"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #4747FF, #7979bd, #4747FF)",
              backgroundSize: "400% 400%",
            }}
          >
            Share files easily and quickly
          </h1>
          <p className="text-[#7b47ff] mt-5 font-regular cursor-pointer">
            See yours links
          </p>
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <Box
            sx={{
              width: "auto",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              flexDirection: "column",
              "@media (max-width: 684px)": {
                width: "100%",
              },
            }}
          >
            <FileUpload onFileChange={handleFileChange} />

            <div
              className={`relative overflow-hidden transition-all duration-300 ease-out               
                  ${file ? "h-[80px]" : "h-[0px]"}
              `}
            >
              <Box className="boxFile h-full relative border-[1px] shadow border-white flex justify-center items-center">
                <React.Fragment>
                  <div
                    className={`
                        w-full gap-10 flex absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] transition-all duration-1000 ease-in-out p-5
                        ${
                          !trigger
                            ? "translate-y-4 opacity-0 pointer-events-none"
                            : "opacity-100"
                        }
                      `}
                  >
                    <TextFieldGiveme value={inputValue} type="link" />
                    <StyledButton onClick={handleCopy}>Copy</StyledButton>
                  </div>

                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] transition-all duration-1000 ease-in-out ${
                      trigger
                        ? "-translate-y-12 opacity-0 pointer-events-none"
                        : "opacity-100"
                    }`}
                  >
                    <div
                      className={`relative transition-all duration-1000 ease-in-out w-full h-full 
                          ${
                            !loading
                              ? "scale-8 opacity-0 pointer-events-none"
                              : "scale-100 opacity-100"
                          }
                        `}
                    >
                      <Dots />
                    </div>
                  </div>
                </React.Fragment>

                <React.Fragment>
                  <div
                    className={`${
                      loading
                        ? "opacity-0 scale-100 translate-y-4 pointer-events-none"
                        : "opacity-100 scale-100 translate-y-0"
                    } flex justify-between w-full transition-all duration-500 ease-in-out`}
                  >
                    <div className="flex gap-5 items-center">
                      <div className="w-8 h-8">
                        <img
                          src={getFileIcon(file?.type)}
                          className="w-full object-contain"
                          alt="File type icon"
                        />
                      </div>
                      <div className="flex flex-col w-auto h-full justify-center">
                        <h4 className="text-[14px] font-medium text-[#6d6c75]">
                          {file?.name}
                        </h4>
                        <div className="flex text-xs font-regular justify-end gap-2 text-[#6d6c75]">
                          <p>Size:</p>
                          <p className="font-medium">
                            {file?.size !== undefined
                              ? `${(file.size / 1024).toFixed(2)} KB`
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        backgroundColor: "#6d6af7",
                        color: "#ffffff",
                        borderRadius: "20px",
                        fontSize: "12px",
                        boxShadow: "none",
                        textTransform: "none",
                        transition: "background-color 0.3s",
                        border: "1px solid #cccc",
                        "&:hover": {
                          backgroundColor: "#4E55FE",
                          boxShadow: "none",
                        },
                      }}
                      onClick={() => setLoading(false)}
                    >
                      Create link
                    </Button>
                  </div>
                </React.Fragment>
              </Box>
            </div>
          </Box>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
