import "./style.css";
import FileUpload from "./components/FileUpload";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Footer from "../../components/Footer";
import jpg from "../../assets/jpg.svg";
import TextFieldGiveme from "../authPage/components/TextField";
import StyledButton from "./components/StyledButton";
import Dots from "./components/Dot";
import mp3 from "../../assets/mp3.svg";
import mp4 from "../../assets/mp4.svg";
import pdf from "../../assets/pdf.svg";
import png from "../../assets/png.svg";

export default function Form() {
  const [file, setFile] = useState<File | null>(null);
  const [inputValue, setInputValue] = useState<string>("aaa"); // Estado para armazenar o valor da TextField

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
  };

  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopy = () => {
    // Lógica para copiar o texto
    console.log("Texto copiado!");
  };

  // useEffect(() => {
  //   if (trigger) {
  //     setTimeout(() => {
  //       setTrigger(false);
  //     }, 2000);
  //   }
  // }, [trigger]);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full h-full p-6 relative z-[2]  gap-2  ">
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
          <button onClick={() => setTrigger((prev) => !prev)}> oii</button>
          <button onClick={() => setLoading((prev) => !prev)}> oiiss</button>
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
          <Box
            sx={{
              width: "auto",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              flexDirection: "column",
            }}
          >
            <FileUpload onFileChange={handleFileChange} />

            <div
              className={`relative overflow-hidden transition-all duration-300 ease-out ${
                !file ? `h-0` : `h-[80px]`
              } `}
            >
              <Box className="boxFile h-full relative  border-[1px] shadow border-white flex justify-center items-center">
                <>
                  <div
                    className={`
                    
                     ${
                       !trigger
                         ? `translate-y-4 opacity-0  pointer-events-none`
                         : ` opacity-100`
                     }
                    w-full gap-10 flex absolute  top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] transition-all duration-1000 ease-in-out p-5`}
                  >
                    <TextFieldGiveme
                      value={inputValue} // Valor controlado pelo estado
                      type="link"
                    />
                    <StyledButton onClick={handleCopy}>Copy</StyledButton>
                  </div>

                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] transition-all duration-1000 ease-in-out ${
                      trigger
                        ? `-translate-y-12 opacity-0  pointer-events-none`
                        : ` opacity-100`
                    }`}
                  >
                    <div
                      className={` relative  transition-all   duration-1000 ease-in-out w-full h-full 
                        
                    ${
                      loading
                        ? `scale-8 opacity-0 pointer-events-none `
                        : `scale-100 opacity-100`
                    }    
                        `}
                    >
                      <Dots />
                    </div>
                  </div>
                </>

                <>
                  <div
                    className={`${
                      !loading
                        ? `opacity-0 scale-100 translate-y-4  pointer-events-none`
                        : `opacity-100 scale-100 translate-y-0`
                    } flex justify-between w-full transition-all duration-500 ease-in-out`}
                  >
                    <div
                      className={` 
              
                      flex gap-5 items-center `}
                    >
                      <div className="w-8 h-8">
                        <img src={jpg} className="w-full object-contain" />
                      </div>
                      <div className="flex flex-col w-auto h-full justify-center">
                        <h4 className="text-[14px] font-medium text-[#6d6c75]">
                          {file?.name}
                        </h4>
                        <div className="flex text-xs font-regular justify-end gap-2 text-[#6d6c75]">
                          <p>Size:</p>
                          <p className="font-medium">
                            {file
                              ? `${(file.size / 1024).toFixed(2)} KB`
                              : "Tamanho não disponível"}
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
                      onClick={() => setLoading(true)}
                    >
                      Create link
                    </Button>
                  </div>
                </>
              </Box>
            </div>
          </Box>
        </div>
        <Footer />
      </div>
    </>
  );
}
