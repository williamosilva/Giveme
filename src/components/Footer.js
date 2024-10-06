import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    const [hoveredIcon, setHoveredIcon] = useState(null);
    return (_jsx("footer", { className: "relative w-full h-fit justify-center items-end flex", children: _jsxs("div", { className: "relative flex flex-col items-center", children: [_jsx("div", { className: "w-52 z-[1] h-fit opacity-30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[120%]", children: _jsx("img", { draggable: false, src: CreatedText, alt: "Created by", className: "w-full h-full object-contain" }) }), _jsx("ul", { className: "flex gap-2 z-[2] relative", children: [
                        {
                            name: "linkedin",
                            url: "https://www.linkedin.com/in/williamsilva2005/",
                        },
                        { name: "github", url: "https://github.com/WilliamSilvaOliveiraa" },
                        { name: "william", url: "https://williamoliveirasilva.online/" },
                    ].map((icon) => (_jsx("li", { className: "w-9 h-9 rounded-xl shadow p-2 relative", onMouseEnter: () => setHoveredIcon(icon.name), onMouseLeave: () => setHoveredIcon(null), children: _jsxs("a", { href: icon.url, target: "_blank", rel: "noopener noreferrer", className: "block w-full h-full", children: [_jsx("img", { src: icon.name === "linkedin"
                                        ? linkedin
                                        : icon.name === "github"
                                            ? github
                                            : william, alt: icon.name.charAt(0).toUpperCase() + icon.name.slice(1), className: `absolute h-[55%] object-contain transition-opacity duration-300 ${hoveredIcon === icon.name ? "opacity-0" : "opacity-100"}` }), _jsx("img", { src: icon.name === "linkedin"
                                        ? linkedin_w
                                        : icon.name === "github"
                                            ? github_w
                                            : william_w, alt: `${icon.name.charAt(0).toUpperCase() + icon.name.slice(1)} Hovered`, className: `absolute h-[55%] object-contain transition-opacity duration-300 ${hoveredIcon === icon.name ? "opacity-100" : "opacity-0"}` })] }) }, icon.name))) }), _jsx("p", { className: "text-[#8787fa] text-sm font-regular mt-4 select-none", children: "\u00A9 2024 Giveme" })] }) }));
}
