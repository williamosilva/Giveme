import React from "react";

interface StyledButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const StyledButton: React.FC<StyledButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="
        relative
        bg-[#b784f5] 
        hover:bg-[#6d6af7]
        text-white 
        rounded-2xl
        group
        text-xs 
        shadow-none 
        w-[120px] 
        px-4 
        py-2 
        transition-all 
        duration-300 
        ease-in-out
        focus:outline-none 
        focus:ring-opacity-50
        overflow-hidden
      "
      onClick={onClick}
    >
      <span className="relative z-10">{children}</span>
      <span
        className="
          absolute 
          inset-0 
          border-[2px] 
          border-white 
         rounded-2xl
        "
        style={{
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      ></span>
      <span
        className="
          absolute 
          -inset-1
          bg-gradient-to-r 
        transition-all
        duration-700
        ease-in-out
        group-hover:from-purple-500
        group-hover:to-[#6d6af7]
        

          from-purple-600 
          to-blue-500 
          rounded-2xl
          blur-lg
          opacity-100
        "
        style={{
          animation: "spin 3s linear infinite",
        }}
      ></span>
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </button>
  );
};

export default StyledButton;
