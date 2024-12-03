import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/use-auth.js"
import postProjects from "../api/post-projects.js";

function CreateProjectForm() {
    const navigate = useNavigate();
    const { auth } = useAuth();

    const [projectData, setProjectData] = useState({
        organisation_name:"",
        organisation_description:"",
        goal: 0,
        image: "",
        is_open: true,
        date_created: "",
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

        // automatically set the date
        const currentDate = new Date().toISOString();

        // update the project data with the current date
        const updateProjectData = {
            ...projectData,
            date_created: currentDate,
        };

        try {
            const response = await postProjects(updateProjectData, auth.token);
            navigate(`/project/${response.id}`);
        } catch (error) {
            console.error("Failed to create a project:". error.message);
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
            <div>
                <label htmlFor="is_open">Project Open:</label>
                <input 
                    type="checkbox" 
                    id="is_open" 
                    defaultChecked={true} 
                    value={projectData.is_open}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" onClick={handleSubmit}>
                Create Project
            </button>
        </form>
    );
}

export default CreateProjectForm;