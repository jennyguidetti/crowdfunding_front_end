import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/use-auth.js"
import putProject from "../api/put-project.js";
import Button from "./Button/Button.jsx";
import DeleteProjectForm from "./DeleteProjectForm.jsx";

function UpdateProjectForm(props) {
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
            await putProject(projectData, project.id);
            navigate(0);
        } catch (error) {
            console.error("Failed to update the project:", error?.message);
        }
    };

    return (
        <div className="form-container">
            <div className="form-header-section">
                <h2>Update Opportunity</h2>
            </div>
            <form className="update-project-form">
                <div className="form-group">
                    <label htmlFor="organisation_name">Organisation Name:</label>
                    <input 
                        type="text" 
                        id="organisation_name" 
                        value={projectData.organisation_name}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="organisation_description">Description:</label>
                    <textarea 
                        id="organisation_description" 
                        value={projectData.organisation_description}
                        onChange={handleChange}
                        rows="3"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="goal">Goal:</label>
                    <input 
                        type="number" 
                        id="goal" 
                        value={projectData.goal}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image URL:</label>
                    <input 
                        type="url" 
                        id="image" 
                        value={projectData.image}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-actions">
                    <Button type="submit" onClick={handleSubmit}>
                        Update
                    </Button>
                    <DeleteProjectForm project={project} />
                </div>
            </form>
        </div>
    );
}

export default UpdateProjectForm;