import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// React imports
import { useEffect, useState } from "react";
// Component imports
import CardLink from "./components/cardLink/CardLink";
import Footer from "../../components/Footer";
import { StyledSnackbar } from "../../components/StyledSnackbar";
// MUI component and icon imports
import { CircularProgress, IconButton } from "@mui/material";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
// Router imports
import { useNavigate } from "react-router-dom";
// Hook imports
import { useGetUserById } from "../../hooks/useGetList";
export default function LinkListing() {
    const navigate = useNavigate();
    const storedUserId = localStorage.getItem("userId") ?? "";
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarState, setSnackbarState] = useState("success");
    const { data: list, refetch, isFetching } = useGetUserById(storedUserId);
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        if (snackbarState === "success") {
            setSnackbarState("loading");
        }
    };
    useEffect(() => {
        if (!isFetching && snackbarState === "loading" && snackbarOpen) {
            setSnackbarState("success");
        }
    }, [isFetching, snackbarState, snackbarOpen]);
    const refetchList = () => {
        setSnackbarState("loading");
        setSnackbarOpen(true);
        refetch();
    };
    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    const snackbarMessage = snackbarState === "loading" ? (_jsxs("div", { className: "flex gap-2 justify-center items-center", children: [_jsx(CircularProgress, { size: 20, sx: { color: "#4747FF" } }), _jsx("p", { className: "align-middle leading-none", children: "Updating list..." })] })) : (_jsxs("div", { className: "flex gap-2 justify-center items-center", children: [_jsx(CheckRoundedIcon, { fontSize: "small", sx: { color: "#4747FF" } }), _jsx("p", { className: "align-middle leading-none", children: "Link successfully deleted" })] }));
    return (_jsxs(_Fragment, { children: [_jsx(StyledSnackbar, { open: snackbarOpen, autoHideDuration: snackbarState === "loading" ? null : 6000, onClose: handleSnackbarClose, message: snackbarMessage }), _jsxs("div", { className: "w-full h-full grid grid-rows-[1fr_2fr_1fr] grid-cols-1 justify-center items-center", children: [_jsxs("div", { className: "h-full w-full grid grid-cols-3 justify-center items-center", children: [_jsx("div", { className: "flex justify-start w-full pl-14 h-full items-start pt-14", children: _jsx(IconButton, { sx: {
                                        position: "absolute",
                                        top: "2%",
                                        left: "2%",
                                    }, onClick: () => {
                                        navigate("/form");
                                    }, children: _jsx(KeyboardBackspaceRoundedIcon, { sx: { color: "#4747FF" } }) }) }), _jsx("div", { className: "flex justify-center", children: _jsx("h1", { className: "font-normal leading-tight font-Sora md:text-[2.8rem] text-[1.8rem] text-transparent bg-clip-text animate-gradient text-center", style: {
                                        backgroundImage: "linear-gradient(270deg, #4747FF, #7979bd, #4747FF)",
                                        backgroundSize: "400% 400%",
                                    }, children: "Your saved links" }) }), _jsx("div", {})] }), list && list.length > 0 ? (_jsx("div", { className: "w-full flex flex-col h-[100%] items-center justify-center gap-6 md:p-0 px-4", children: _jsx(_Fragment, { children: list.map((link) => (_jsx(CardLink, { link: link.link, date: formatDate(link.uploadDate), fileId: link.fileId, onDeleteSuccess: refetchList }, link._id))) }) })) : (_jsx("div", { className: "w-full flex justify-center items-center", children: _jsx("h2", { className: "text-xl font-regular text-blue-700 mb-3", children: "No links saved..." }) })), _jsx("div", { className: "h-full flex-col flex justify-end pb-6", children: _jsx(Footer, {}) })] })] }));
}
