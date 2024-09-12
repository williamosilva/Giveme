interface ButtonGivemeProps {
  buttonText: string;
}

export default function ButtonGiveme({ buttonText }: ButtonGivemeProps) {
  return (
    <div>
      <button className="bg-[#4747FF] hover:bg-[#3636c0] transition-all duration-300 text-white font-bold py-4 px-4 rounded-xl w-full">
        {buttonText}
      </button>
    </div>
  );
}
