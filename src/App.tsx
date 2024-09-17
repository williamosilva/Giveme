import { useState } from "react";
import "./App.css";
import Form from "./pages/Form/Form";
import AuthPage from "./pages/authPage/AuthPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="relative flex w-full h-full justify-center items-center overflow-hidden">
      <div className="relative z-10 w-full h-full">
        <Form />
      </div>

      <span className=" blur-background w-[30vw] h-[30vw] rounded-full absolute animate-grow"></span>
      <span className=" blur-background2 w-[40vw] h-[40vw] rounded-full absolute animate-grow"></span>
      <span className=" blur-background3 w-[50vw] h-[50vw] rounded-full absolute  animate-grow"></span>
    </div>
  );
}

export default App;
