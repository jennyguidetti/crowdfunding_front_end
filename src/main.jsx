import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Homepage";
import ProjectPage from "./pages/ProjectPage";

import NavBar from "./components/NavBar";

const router = createBrowserRouter([
    {
        path: "/",
        element: <NavBar />,
        children: [
            { path: "/", element: <HomePage />},
            { path: "/project/:id", element: <ProjectPage />},
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        {/* Here we wrap our app in the router provider so they render*/}
        <RouterProvider router={router} />
    </React.StrictMode>
);