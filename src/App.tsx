import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./pages/login/Login";
import List from "./pages/List";
import Form from "./pages/Form";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Login />
      {/* <List />
      <Form /> */}
    </>
  );
}

export default App;
