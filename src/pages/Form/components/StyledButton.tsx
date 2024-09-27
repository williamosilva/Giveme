import React, { useState, useEffect } from "react";

interface StyledButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const StyledButton: React.FC<StyledButtonProps> = ({ onClick, children }) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCopied) {
      timer = setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isCopied]);

  const handleClick = () => {
    onClick();
    setIsCopied(true);
  };

  return (
    <button
      className={`
        relative
        ${
          isCopied
            ? "bg-green-500 hover:bg-green-600"
            : "bg-[#b784f5] hover:bg-[#6d6af7]"
        }
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
      `}
      onClick={handleClick}
    >
      <span className="relative z-10 transition-all duration-300 ease-in-out">
        {isCopied ? "Copied!" : children}
      </span>
      <span
        className={`
          absolute 
          inset-0 
          border-[2px] 
          border-white 
          rounded-2xl
          transition-all
          duration-300
          ease-in-out
          ${isCopied ? "opacity-100" : "opacity-100"}
        `}
        style={{
          animation: isCopied
            ? "pulse 2s cubic-bezieinfiniter(0.4, 0, 0.6, 1)"
            : "pulse 2s cubic-bezieinfiniter(0.4, 0, 0.6, 1) ",
        }}
      ></span>
      <span
        className={`
          absolute 
          -inset-1
          bg-gradient-to-r 
          transition-all
          duration-700
          ease-in-out
          ${
            isCopied
              ? " from-green-400 to-[#6aff91]"
              : "group-hover:from-purple-500 group-hover:to-[#6d6af7] from-purple-600 to-blue-500"
          }
          rounded-2xl
          blur-lg
          opacity-100
        `}
        style={{
          animation: isCopied ? "none" : "spin 3s linear infinite",
          transition: "background 0.3s ease-in-out, transform 0.3s ease-in-out",
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
        button {
          transition: background-color 0.3s ease-in-out,
            transform 0.3s ease-in-out;
        }

        button:active {
          transform: scale(0.9);
        }
      `}</style>
    </button>
  );
};

export default StyledButton;
