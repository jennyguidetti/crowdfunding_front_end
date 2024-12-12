import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ProjectPage from "./pages/ProjectPage/ProjectPage.jsx";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage.jsx";
import AccountPage from "./pages/AccountPage/AccountPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import CreateProjectPage from "./pages/CreateProjectPage.jsx";
import CreatePledgePage from "./pages/CreatePledgePage.jsx";

import "./index.css";

import { AuthProvider } from "./components/AuthProvider.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <NavBar />,
        children: [
            { path: "/", element: <HomePage />},
            { path: "/signup", element: <SignUpPage />},
            { path: "/login", element: <LoginPage />},
            { path: "/projectsall", element: <ProjectsPage />}, // change path
            { path: "/user", element: <AccountPage />},
            { path: "/projects", element: <CreateProjectPage />},
            { path: "/project/:id", element: <ProjectPage />},
            { path: "/pledges", element: <CreatePledgePage />},
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            {/* Here we wrap our app in the router provider so they render*/}
            <RouterProvider router={router} />
        </AuthProvider>
    </React.StrictMode>
);