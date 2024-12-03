import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/use-auth.js"
import postPledge from "../api/post-pledge.js";

function CreatePledgeForm() {
    const navigate = useNavigate();
    const { auth } = useAuth();

    const [pledgeData, setPledgeData] = useState({
        hours:"",
        comment:"",
        anonymous: false,
        project: "",
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
            const response = await postProjects(pledgeData, auth.token);
            navigate(`/pledges`);
        } catch (error) {
            console.error("Failed to create a pledge:". error.message);
        }
    };

    return (
        <form>
            <div>
                <label htmlFor="hours">Hours:</label>
                <input 
                    type="number" 
                    id="hours" 
                    placeholder="Enter hours"
                    value={pledgeData.hours}
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label htmlFor="comment">Comment:</label>
                <input 
                    type="text" 
                    id="comment" 
                    placeholder="Comment" 
                    value={pledgeData.comment}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" onClick={handleSubmit}>
                Pledge
            </button>
        </form>
    );
}

export default CreatePledgeForm;