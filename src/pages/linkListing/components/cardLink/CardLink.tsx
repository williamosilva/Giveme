import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import CallMadeRoundedIcon from "@mui/icons-material/CallMadeRounded";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { IconButton } from "@mui/material";
import { useDeleteFile } from "../../../../hooks/useFile";
import "./style.css";

interface CardLinkProps {
  link: string;
  date: string;
  fileId: string;
  onDeleteSuccess: () => void;
}

export default function CardLink({
  link,
  date,
  fileId,
  onDeleteSuccess,
}: CardLinkProps) {
  const { mutate } = useDeleteFile();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(link);
  };

  const handleDelete = (fileId: string) => {
    mutate(fileId, {
      onSuccess: () => {
        onDeleteSuccess();
      },
    });
  };

  return (
    <div className="relative p-4 w-full max-w-[640px] h-auto mx-auto rounded-2xl overflow-hidden shadow border-snake flex bg-white">
      <div className="absolute inset-0 bg-gradient-to-r from-[#ffffff] via-[#fdfcfe] to-[#fcfcfe] opacity-100 animate-moving-lights"></div>

      <div className="relative z-10 flex overflow-hidden overflow-x-auto justify-between items-center w-full">
        <div className="flex items-center gap-4 flex-grow min-w-0">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-100 shadow-sm flex-shrink-0">
            <p className="font-DM text-blue-500 text-base">G</p>
          </div>

          {/* Texto central */}
          <div className="flex-grow min-w-0 overflow-hidden">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-base text-[#9299bc] font-medium flex-grow min-w-0">
                {link}
              </h2>
              <IconButton
                size="small"
                className="flex-shrink-0"
                onClick={handleCopyLink}
              >
                <ContentCopyRoundedIcon
                  fontSize="small"
                  sx={{ color: "#9992bc", opacity: 0.8 }}
                />
              </IconButton>
            </div>
            <p className="truncate text-sm text-neutral-400 font-medium">
              {date}
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-2 ml-4">
          <IconButton
            className="flex-shrink-0"
            onClick={() => handleDelete(fileId)}
          >
            <DeleteOutlineOutlinedIcon sx={{ color: "#9992bc" }} />
          </IconButton>
          <a href={link} target="_blank" rel="noreferrer noopener">
            <IconButton className="flex-shrink-0">
              <CallMadeRoundedIcon sx={{ color: "#9992bc" }} />
            </IconButton>
          </a>
        </div>
      </div>
    </div>
  );
}
