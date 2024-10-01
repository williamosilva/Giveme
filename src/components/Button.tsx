interface ButtonGivemeProps {
  buttonText: string;
  onClick: () => void;
}

export default function ButtonGiveme({
  buttonText,
  onClick,
}: ButtonGivemeProps) {
  return (
    <div>
      <button
        className="bg-[#4747FF] hover:bg-[#3636c0] transition-all duration-300 text-white font-bold py-4 px-4 rounded-xl w-full"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
}
