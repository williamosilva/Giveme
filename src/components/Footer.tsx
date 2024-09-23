import { useState } from "react";
import CreatedText from "../assets/footer_text.png";
import github from "../assets/github_typo.png";
import linkedin from "../assets/linkedin_typo.png";
import william from "../assets/william_typo.png";
import github_w from "../assets/github_typo-w.png";
import linkedin_w from "../assets/linkedin_typo-w.png";
import william_w from "../assets/william_typo_w.png";
import "./style.css";

export default function Footer() {
  const [hoveredIcon, setHoveredIcon] = useState(null as string | null);

  return (
    <footer className="relative w-full h-fit justify-center items-end flex">
      <div className="relative flex flex-col items-center">
        <div className="w-52 z-[1] h-fit opacity-30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[120%]">
          <img
            src={CreatedText}
            alt="Created by"
            className="w-full h-full object-contain"
          />
        </div>
        <ul className="flex gap-2 z-[2] relative">
          {["linkedin", "github", "william"].map((icon) => (
            <li
              key={icon}
              className="w-9 h-9 rounded-xl shadow p-2 relative"
              onMouseEnter={() => setHoveredIcon(icon)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <img
                src={
                  icon === "linkedin"
                    ? linkedin
                    : icon === "github"
                    ? github
                    : william
                }
                alt={icon.charAt(0).toUpperCase() + icon.slice(1)}
                className={`absolute   h-[55%] object-contain transition-opacity duration-300 ${
                  hoveredIcon === icon ? "opacity-0" : "opacity-100"
                }`}
              />
              <img
                src={
                  icon === "linkedin"
                    ? linkedin_w
                    : icon === "github"
                    ? github_w
                    : william_w
                }
                alt={`${icon.charAt(0).toUpperCase() + icon.slice(1)} Hovered`}
                className={`absolute   h-[55%] object-contain transition-opacity duration-300 ${
                  hoveredIcon === icon ? "opacity-100" : "opacity-0"
                }`}
              />
            </li>
          ))}
        </ul>
        <p className="text-[#8787fa] text-sm font-regular mt-4">
          © 2024 Giveme
        </p>
      </div>
    </footer>
  );
}
