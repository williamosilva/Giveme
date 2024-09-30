import CardLink from "./components/cardLink/CardLink";
import { IconButton } from "@mui/material";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import Footer from "../../components/Footer";

export default function LinkListing() {
  return (
    <div className="w-full h-full grid grid-rows-[1fr_2fr_1fr] grid-cols-1 justify-center items-center">
      <div className="h-full w-full grid grid-cols-3 justify-center items-center">
        <div className="flex justify-start w-full pl-14 h-full items-start pt-14">
          <IconButton>
            <KeyboardBackspaceRoundedIcon sx={{ color: "#4747FF" }} />
          </IconButton>
        </div>
        <div className="flex justify-center">
          <h1
            className="font-normal leading-tight font-Sora md:text-[2.8rem] text-[1.8rem] text-transparent bg-clip-text animate-gradient text-center"
            style={{
              backgroundImage:
                "linear-gradient(270deg, #4747FF, #7979bd, #4747FF)",
              backgroundSize: "400% 400%",
            }}
          >
            Your saved links
          </h1>
        </div>
        <div></div>
      </div>

      {true ? (
        <div className="w-full flex flex-col h-[100%] items-center justify-center gap-6 md:p-0 px-4">
          <CardLink />
          <CardLink />
          <CardLink />
        </div>
      ) : (
        <div className="w-full flex justify-center items-center">
          <h2 className="text-xl font-regular text-blue-700 mb-3">
            No links saved yet
          </h2>
        </div>
      )}

      <div className="h-full flex-col flex justify-end pb-6">
        <Footer />
      </div>
    </div>
  );
}
