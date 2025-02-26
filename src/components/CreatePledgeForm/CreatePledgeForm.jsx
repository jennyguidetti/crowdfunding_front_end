import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth.js"
import postPledge from "../../api/post-pledge.js";
import Button from "../Button/Button.jsx";
import "./CreatePledgeForm.css";

function CreatePledgeForm(props) {
    const { projectId } = props;
    const navigate = useNavigate();
    const { auth } = useAuth();

    const [pledgeData, setPledgeData] = useState({
        hours:"",
        comment:"",
        anonymous: false,
        project: projectId,
    });

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setPledgeData((prevPledgeData) => ({
            ...prevPledgeData,
            [id]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await postPledge(pledgeData, auth.token);
            navigate(0); // to reload the same page, is the same as navigate("/")
        } catch (error) {
            console.error("Failed to create a pledge:", error.message);
        }
    };

    return (
        <div className="form-container">
            <div className="form-header-section">
                <h2>Apply for a spot</h2>
            </div>
            <form className="create-pledge-form">
                <div className="form-group">
                    <label htmlFor="hours">Hours:</label>
                    <input 
                        type="number" 
                        id="hours" 
                        placeholder="Enter hours"
                        value={pledgeData.hours}
                        onChange={handleChange} 
                        min="10"
                        step="10"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="comment">Comment:</label>
                    <textarea 
                        id="comment" 
                        placeholder="Add a comment" 
                        value={pledgeData.comment}
                        onChange={handleChange}
                        rows="3"
                    />
                </div>
                <div className="form-actions">
                    <Button type="submit" onClick={handleSubmit}>
                        Submit Pledge
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default CreatePledgeForm;