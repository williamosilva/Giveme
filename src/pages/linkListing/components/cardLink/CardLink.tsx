import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CallMadeRoundedIcon from "@mui/icons-material/CallMadeRounded";
import { IconButton } from "@mui/material";
import "./style.css";

export default function CardLink() {
  return (
    <div className="relative p-4 w-full max-w-[640px] mx-auto rounded-2xl overflow-hidden shadow border-snake flex bg-white">
      <div className="absolute inset-0 bg-gradient-to-r from-[#ffffff] via-[#fdfcfe] to-[#fcfcfe] opacity-100 animate-moving-lights"></div>

      <div className="relative z-10 flex  sm:flex-row justify-between items-start sm:items-center w-full gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4 w-full">
          <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-neutral-100 shadow-sm flex-shrink-0">
            <p className="font-DM text-blue-500 text-sm sm:text-base">G</p>
          </div>

          {/* Texto central */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-sm sm:text-base text-[#9299bc] font-medium">
                https://github.com/WilliamSilvaOliveiraa
              </h2>
              <IconButton size="small" className="flex-shrink-0">
                <ContentCopyRoundedIcon
                  fontSize="small"
                  sx={{ color: "#9992bc", opacity: 0.8 }}
                />
              </IconButton>
            </div>
            <p className="truncate text-xs sm:text-sm text-neutral-400 font-medium">
              20/20/1999
            </p>
          </div>
        </div>

        <div className="w-auto sm:block hidden">
          <IconButton className="flex-shrink-0 mt-2">
            <CallMadeRoundedIcon sx={{ color: "#9992bc" }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
