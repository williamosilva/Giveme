import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import StyledBackground from "./components/StyledBackground";
import "./App.css";
import Form from "./pages/Form/Form";
import LinkListing from "./pages/linkListing/LinkListing";
import AuthPage from "./pages/authPage/AuthPage";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./hooks/useAuth";

// Rota protegida que verifica se o usuário está autenticado
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>; // Pode ser um spinner de loading
  }

  if (!isAuthenticated) {
    // Se o usuário não estiver autenticado, redireciona para a página de login
    return <Navigate to="/" />;
  }

  return <>{children}</>; // Renderiza as rotas protegidas se o usuário estiver autenticado
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
