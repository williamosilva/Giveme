// React imports
import React, { useContext, useEffect, useState } from "react";

// CSS styles
import "./style.css";

// Component imports
import FileUpload from "./components/FileUpload";
import Footer from "../../components/Footer";
import TextFieldGiveme from "../../components/TextField";
import StyledButton from "./components/StyledButton";
import Dots from "../../components/Dot";
import { StyledSnackbar } from "../../components/StyledSnackbar";

// MUI component imports
import { Box, Button, IconButton } from "@mui/material";
import PriorityHighRoundedIcon from "@mui/icons-material/PriorityHighRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

// Asset imports
import jpg from "../../assets/jpg.svg";
import mp3 from "../../assets/mp3.svg";
import mp4 from "../../assets/mp4.svg";
import pdf from "../../assets/pdf.svg";
import png from "../../assets/png.svg";

// Router imports
import { useNavigate } from "react-router-dom";

// Hook imports
import { useLogoutMutation } from "../../hooks/useLogout";
import { useUploadFile } from "../../hooks/useFile";

// Context imports
import { AuthContext } from "../../contexts/AuthContext";

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
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const token = localStorage.getItem("accessToken");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const {
    mutate: uploadAndCreateUrl,
    isLoading,
    data,
    isSuccess,
    reset,
  } = useUploadFile();

  const handleFileUpload = async (file: File) => {
    try {
      const result = await uploadAndCreateUrl({ file });
      // console.log("Upload concluído e URL pública gerada:", result);
    } catch (err: string | any) {
      console.error("Erro durante o processo:", err);
      setUploadError(err.message || "Erro desconhecido");
    }
  };

  useEffect(() => {
    if (auth?.justLoggedIn) {
      const timer = setTimeout(() => {
        auth.clearLoginIndicator();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [auth?.justLoggedIn]);

  const handleCloseSnackbar = () => {
    auth?.clearLoginIndicator();
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.uploadInfo?.link) {
        setInputValue(data.uploadInfo.link);
      }
      // console.log("Data:", data);
    }
  }, [isSuccess, data]);

  const handleFileChange = (selectedFile: any) => {
    if (isSuccess) {
      setInputValue("");
      reset();
    }

    const MAX_FILE_SIZE = 4 * 1024 * 1024;

    if (!selectedFile) {
      return;
    }

    if (!allowedFileTypes.includes(selectedFile.type)) {
      setFile(null);
      handleOpen("type");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setFile(null);
      handleOpen("size");
      return;
    }

    setFile(selectedFile);
    // console.log("File type:", selectedFile.type);
    // console.log("File size:", selectedFile.size);
  };

  const handleSubmit = () => {
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleCopy = () => {
    const textToCopy = inputValue;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        // console.log("Text copied!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (errorType: "type" | "size" = "type") => {
    setOpen(true);
    if (errorType === "size") {
      setErrorMessage("File size exceeds 4MB limit.");
    } else {
      setErrorMessage("Invalid file type.");
    }
  };
  const { mutate: logout } = useLogoutMutation();

  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (refreshToken) {
      logout(refreshToken);
    } else {
      console.error("Refresh token não encontrado");
    }
  };

  return (
    <React.Fragment>
      <StyledSnackbar
        open={!!uploadError}
        autoHideDuration={6000}
        onClose={() => setUploadError(null)}
        message={
          <div className="flex gap-2 justify-center items-center">
            <PriorityHighRoundedIcon
              fontSize="small"
              sx={{ color: "#4747FF" }}
            />
            <p className="align-middle leading-none">{uploadError}</p>
          </div>
        }
      />
      <StyledSnackbar
        open={auth?.justLoggedIn || false}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={
          <div className="flex gap-2 justify-center items-center">
            <CheckRoundedIcon fontSize="small" sx={{ color: "#4747FF" }} />
            <p className="align-middle leading-none ">Successfully connected</p>
          </div>
        }
      />
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
            <p className="align-middle leading-none ">{errorMessage}</p>
          </div>
        }
      />

      <div className="flex flex-col justify-center items-center w-full h-full p-6 relative z-[2] gap-2">
        <div className="flex flex-col items-center w-full h-fit justify-center">
          <IconButton
            sx={{
              position: "absolute",
              top: "2%",
              left: "2%",
            }}
            onClick={() => {
              handleLogout();
            }}
          >
            <LogoutRoundedIcon
              sx={{ color: "#4747FF", transform: " rotateY(3.142rad)" }}
            />
          </IconButton>
          <h1
            className="font-medium font-DM leading-none sm:text-9xl  text-8xl text-transparent bg-clip-text animate-gradient select-none"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #668aff, #4747FF, #668aff)",
              backgroundSize: "400% 400%",
            }}
          >
            Giveme
          </h1>

          <h1
            className="font-normal select-none leading-tight font-Sora sm:text-[1.72rem]  text-[1.38rem] text-transparent bg-clip-text animate-gradient"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #4747FF, #7979bd, #4747FF)",
              backgroundSize: "400% 400%",
            }}
          >
            Share files easily and quickly
          </h1>
          <p
            className="text-[#7b47ff] mt-5 font-regular cursor-pointer hover:text-[#4747FF] transition-all duration-300 ease-in-out"
            onClick={() => navigate("/list")}
          >
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

              "@media (max-width: 640px)": {
                width: "100%",
              },
            }}
          >
            <FileUpload onFileChange={handleFileChange} />

            <div
              className={`relative 
                overflow-hidden  
                transition-all duration-300 ease-out  sm:w-[637px]    
                w-full

                  ${file ? "h-[80px]" : "h-[0px]"}
              `}
            >
              <Box className="boxFile h-full relative border-[1px] shadow w-full  border-white flex justify-center items-center">
                <React.Fragment>
                  <div
                    className={`
               w-full gap-10 flex absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] transition-all duration-1000 ease-in-out p-5
               ${
                 !isSuccess
                   ? "translate-y-4 opacity-0 pointer-events-none"
                   : "opacity-100"
               }
             `}
                  >
                    <TextFieldGiveme value={inputValue} type="link" />
                    <StyledButton onClick={handleCopy}>Copy</StyledButton>
                  </div>

                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-[50%]  transition-all duration-1000 ease-in-out 
        ${
          isSuccess && !isLoading
            ? "-translate-y-14 opacity-0 pointer-events-none"
            : "opacity-100 -translate-y-[50%]"
        }
  `}
                  >
                    <div
                      className={`relative transition-all duration-1000 ease-in-out w-full h-full 
                     ${
                       isLoading
                         ? "scale-100 opacity-100"
                         : "scale-8 opacity-0 pointer-events-none"
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
                      isLoading || (isSuccess && !isLoading)
                        ? "opacity-0 scale-100 translate-y-4 pointer-events-none"
                        : "opacity-100 scale-100 translate-y-0"
                    } flex flex-row justify-between w-full transition-all duration-500 ease-in-out`}
                  >
                    <div className="flex items-center gap-4 w-0 flex-grow min-w-0">
                      <div className="w-8 h-8 flex-shrink-0 pointer-events-none ">
                        <img
                          src={getFileIcon(file?.type)}
                          className="w-full object-contain"
                          alt="File type icon"
                        />
                      </div>
                      <div className="flex flex-col justify-center flex-grow min-w-0 overflow-hidden">
                        <h4 className="text-[14px] font-medium text-[#6d6c75] truncate">
                          {file?.name}
                        </h4>
                        <div className="flex text-xs font-regular justify-start gap-2 text-[#6d6c75]">
                          <p className="flex-shrink-0">Size:&nbsp;</p>
                          <p className="font-medium truncate">
                            {file?.size !== undefined
                              ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-auto flex-shrink-0 ml-4">
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
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
                        onClick={handleSubmit}
                      >
                        Create link
                      </Button>
                    </div>
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
