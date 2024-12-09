import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/use-auth.js"
import putProject from "../api/put-project.js";

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
        <form>
            <div>
                <label htmlFor="organisation_name">Organisation Name:</label>
                <input 
                    type="text" 
                    id="organisation_name" 
                    placeholder="Enter Organisation Name"
                    value={projectData.organisation_name}
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label htmlFor="organisation_description">Organisation Description:</label>
                <input 
                    type="text" 
                    id="organisation_description" 
                    placeholder="Enter Organisation Description" 
                    value={projectData.organisation_description}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="goal">Goal:</label>
                <input 
                    type="number" 
                    id="goal" 
                    placeholder="Enter Organisation Goal"
                    value={projectData.goal}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="image">Image:</label>
                <input 
                    type="url" 
                    id="image" 
                    placeholder="Add Organisation Image Link" 
                    value={projectData.image}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" onClick={handleSubmit}>
                Update Project
            </button>
        </form>
    );
}

export default UpdateProjectForm;