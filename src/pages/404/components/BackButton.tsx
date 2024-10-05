import { Link } from "react-router-dom";

export default function BackButton() {
  return (
    <div className="flex items-center justify-center mt-4">
      <Link to="/form" className="flex items-center space-x-2 text-gray-500">
        <div className="py-3 px-10 border-[1px] relative border-[#515CFE] flex justify-center items-center rounded-full bg-[#E9F2FB] group overflow-hidden">
          <div className="w-5 h-5 rounded-full bg-gradient-to-t from-[#515CFE] to-blue-500 absolute transition-all duration-500 ease-in-out left-[10%] group-hover:w-56 group-hover:h-56 group-hover:-left-1"></div>
          <p className="left-[18%] relative text-[#515CFE] font-medium group-hover:left-0 group-hover:text-white transition-all duration-500 ease-in-out">
            Return to form
          </p>
        </div>
      </Link>
    </div>
  );
}
