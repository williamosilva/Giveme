import StyledBackground from "./components/StyledBackground";
import "./App.css";
import Form from "./pages/Form/Form";
import LinkListing from "./pages/linkListing/LinkListing";
import AuthPage from "./pages/authPage/AuthPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="relative flex w-full h-full justify-center items-center overflow-hidden">
      <div className="relative z-10 w-full h-full flex justify-center items-center">
        <Router>
          <Routes>
            <Route path="/form" element={<Form />} />
            <Route path="/" element={<AuthPage />} />
            <Route path="/list" element={<LinkListing />} />
          </Routes>
        </Router>
      </div>
      <StyledBackground />
    </div>
  );
}

export default App;
