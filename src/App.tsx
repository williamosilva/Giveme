// React Imports
import React, { useEffect } from "react";

// React Router Imports
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Component Imports
import StyledBackground from "./components/StyledBackground";
import Form from "./pages/Form/Form";
import Error404 from "./pages/404/Erro404";
import LinkListing from "./pages/linkListing/LinkListing";
import AuthPage from "./pages/authPage/AuthPage";

// Context Imports
import { AuthProvider } from "./contexts/AuthContext";

// Hook Imports
import { useAuth } from "./hooks/useAuth";

// Style Imports
import "./App.css";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

function AppRoutes() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/form" /> : <AuthPage />}
      />
      <Route
        path="/form"
        element={
          <ProtectedRoute>
            <Form />
          </ProtectedRoute>
        }
      />
      <Route
        path="/list"
        element={
          <ProtectedRoute>
            <LinkListing />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="relative flex w-full h-full justify-center items-center overflow-hidden">
        <div className="relative z-10 w-full h-full flex justify-center items-center">
          <Router>
            <AppRoutes />
          </Router>
        </div>
        <StyledBackground />
      </div>
    </AuthProvider>
  );
}

export default App;
