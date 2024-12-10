import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/use-auth.js"
import deleteProject from "../api/delete-project.js";

function DeleteProjectForm(props) {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { project } = props;

    const [projectData, setProjectData] = useState({
        organisation_name: project.organisation_name,
        organisation_description: project.organisation_description,
        goal: project.goal,
        image: project.image,
        is_open: project.is_open,
    });

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setProjectData((prevProjectData) => ({
            ...prevProjectData,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await deleteProject(projectData, project.id);
            navigate(`/`);
        } catch (error) {
            console.error("Failed to delete the project:", error?.message);
        }
    };

    return (
        <form>
            <button type="submit" onClick={handleSubmit}>
                Delete Project
            </button>
        </form>
    );
}

export default DeleteProjectForm;