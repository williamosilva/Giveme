import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import cube from "../assets/cube.png";
import heart from "../assets/heart.png";
import sparkle from "../assets/sparkle.png";
import shape1 from "../assets/shape1.png";
import shape2 from "../assets/shape2.png";
export default function StyledBackground() {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "w-full h-full  absolute opacity-50 ", children: [_jsx("span", { className: " blur-background w-[30vw] h-[30vw] rounded-full absolute animate-grow" }), _jsx("span", { className: " blur-background2 w-[40vw] h-[40vw] rounded-full absolute animate-grow" }), _jsx("span", { className: " blur-background3 w-[50vw] h-[50vw] rounded-full absolute  animate-grow" })] }), _jsx("div", { className: "grid-container z-[1]" }), _jsx("div", { className: "absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-full z-[0]", children: _jsxs("div", { className: "relative w-full h-full", children: [_jsx("img", { src: heart, alt: "heartBackground", className: "absolute top-[10%] left-[10%] w-52 h-52 object-contain " }), _jsx("img", { src: cube, alt: "cubeBackground", className: "absolute bottom-[10%] right-[10%] w-52 h-52 object-contain " }), _jsx("img", { src: sparkle, alt: "cubeBackground", className: "absolute top-[20%] right-[20%] w-16 h-16 object-contain  opacity-30" }), _jsx("img", { src: shape1, alt: "cubeBackground", className: "absolute bottom-[52%] left-[26%] w-16 h-16 object-contain  opacity-40" }), _jsx("img", { src: shape2, alt: "cubeBackground", className: "absolute bottom-[14%] left-[18%] w-16 h-16 object-contain  opacity-40" })] }) })] }));
}
