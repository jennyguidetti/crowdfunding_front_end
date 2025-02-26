import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth.js"
import postProjects from "../../api/post-projects.js";
import Button from "../Button/Button.jsx";
import "./CreateProjectForm.css";

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
        <div className="create-project-form-container">
            <div className="form-header-section">
                <h2>Create New Opportunity</h2>
            </div>
            <form className="create-project-form">
                <div className="form-group">
                    <label htmlFor="organisation_name">Organisation Name:</label>
                    <input 
                        type="text" 
                        id="organisation_name" 
                        placeholder="Enter Organisation Name"
                        value={projectData.organisation_name}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="organisation_description">Organisation Description:</label>
                    <textarea 
                        id="organisation_description" 
                        placeholder="Enter Organisation Description" 
                        value={projectData.organisation_description}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="goal">Hours available:</label>
                    <input 
                        type="number" 
                        id="goal" 
                        placeholder="Enter Organisation Goal"
                        value={projectData.goal}
                        onChange={handleChange}
                    />
                </div>
            <div className="form-group">
                    <label htmlFor="image">Logo Image URL:</label>
                    <input 
                        type="url" 
                        id="image" 
                        placeholder="Add Organisation Image Link" 
                        value={projectData.image}
                        onChange={handleChange}
                    />
                </div>
            <div className="form-actions">
                    <Button type="submit" onClick={handleSubmit}>
                        Create Opportunity
                    </Button>
                </div>
        </form>
        </div>
    );
}

export default CreateProjectForm;