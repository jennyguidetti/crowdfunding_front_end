import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import HomePage from "./pages/Homepage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import CreateProjectPage from "./pages/CreateProjectPage.jsx";

import NavBar from "./components/NavBar.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import CreatePledgePage from "./pages/CreatePledgePage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <NavBar />,
        children: [
            { path: "/", element: <HomePage />},
            { path: "/signup", element: <SignUpPage />},
            { path: "/login", element: <LoginPage />},
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