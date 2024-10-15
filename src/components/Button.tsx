import React from "react";

interface ButtonGivemeProps {
  buttonText: string;
  onClick: () => void;
  isLoading: boolean;
}

export default function ButtonGiveme({
  buttonText,
  onClick,
  isLoading,
}: ButtonGivemeProps) {
  return (
    <div>
      <button
        className={`
          bg-[#4747FF] hover:bg-[#3636c0] transition-all duration-300 
          text-white font-bold py-4 px-4 rounded-xl w-full
          relative overflow-hidden
          ${isLoading ? "cursor-not-allowed opacity-75" : ""}
        `}
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
          </div>
        )}
        <span className={`${isLoading ? "invisible" : ""}`}>{buttonText}</span>
      </button>
    </div>
  );
}
