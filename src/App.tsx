import { useState } from "react";
import "./App.css";
import Form from "./pages/Form/Form";
import LinkListing from "./pages/linkListing/LinkListing";
import AuthPage from "./pages/authPage/AuthPage";
import cube from "./assets/cube.png";
import heart from "./assets/heart.png";
import sparkle from "./assets/sparkle.png";
import shape1 from "./assets/shape1.png";
import shape2 from "./assets/shape2.png";

function App() {
  return (
    <div className="relative flex w-full h-full justify-center items-center overflow-hidden">
      <div className="relative z-10 w-full h-full flex justify-center items-center">
        {/* <Form /> */}
        {/* <AuthPage /> */}
        <LinkListing />
      </div>
      <div className="w-full h-full  absolute opacity-50 ">
        <span className=" blur-background w-[30vw] h-[30vw] rounded-full absolute animate-grow"></span>
        <span className=" blur-background2 w-[40vw] h-[40vw] rounded-full absolute animate-grow"></span>
        <span className=" blur-background3 w-[50vw] h-[50vw] rounded-full absolute  animate-grow"></span>
      </div>
      <div className="grid-container z-[1]"></div>
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-full h-full z-[0]">
        <div className="relative w-full h-full">
          <img
            src={heart}
            alt="heartBackground"
            className="absolute top-[10%] left-[10%] w-52 h-52 object-contain "
          />
          <img
            src={cube}
            alt="cubeBackground"
            className="absolute bottom-[10%] right-[10%] w-52 h-52 object-contain "
          />
          <img
            src={sparkle}
            alt="cubeBackground"
            className="absolute top-[20%] right-[20%] w-16 h-16 object-contain  opacity-30"
          />
          <img
            src={shape1}
            alt="cubeBackground"
            className="absolute bottom-[52%] left-[26%] w-16 h-16 object-contain  opacity-40"
          />

          <img
            src={shape2}
            alt="cubeBackground"
            className="absolute bottom-[14%] left-[18%] w-16 h-16 object-contain  opacity-40"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
