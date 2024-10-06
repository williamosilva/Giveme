import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// React Router Imports
import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
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
const ProtectedRoute = ({ children, }) => {
    const { isAuthenticated, loading } = useAuth();
    if (loading) {
        return _jsx("div", { children: "Carregando..." });
    }
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: "/" });
    }
    return _jsx(_Fragment, { children: children });
};
function AppRoutes() {
    const { isAuthenticated, loading } = useAuth();
    if (loading) {
        return _jsx("div", { children: "Carregando..." });
    }
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: isAuthenticated ? _jsx(Navigate, { to: "/form" }) : _jsx(AuthPage, {}) }), _jsx(Route, { path: "/form", element: _jsx(ProtectedRoute, { children: _jsx(Form, {}) }) }), _jsx(Route, { path: "/list", element: _jsx(ProtectedRoute, { children: _jsx(LinkListing, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Error404, {}) })] }));
}
function App() {
    return (_jsx(AuthProvider, { children: _jsxs("div", { className: "relative flex w-full h-full justify-center items-center overflow-hidden", children: [_jsx("div", { className: "relative z-10 w-full h-full flex justify-center items-center", children: _jsx(Router, { children: _jsx(AppRoutes, {}) }) }), _jsx(StyledBackground, {})] }) }));
}
export default App;
