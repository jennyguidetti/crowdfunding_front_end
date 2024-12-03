import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postLogin from "../api/post-login.js";
import { useAuth } from "../hooks/use-auth.js"
import postSignUp from "../api/post-sign-up.js";

function SignUpForm() {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();

    const [credentials, setCredentials] = useState({
        username:"",
        first_name:"",
        last_name:"",
        email: "",
        password:"",
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (credentials.username && credentials.email && credentials.password) {
            postSignUp(
                credentials.username,
                credentials.first_name,
                credentials.last_name,
                credentials.email,
                credentials.password,
                credentials.employer,
                credentials.clinical_level,
            ).then((response) => {
                postLogin(
                    credentials.username,
                    credentials.password
                ).then((response) => {
                    window.localStorage.setItem("token", response.token);
                    setAuth({
                        token: response.token,
                    });
                    navigate("/");
                });
            });
        }
    };

    return (
        <form>
            <div>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder="Enter username"
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label htmlFor="first_name">First name:</label>
                <input 
                    type="text" 
                    id="first_name" 
                    placeholder="Enter first name"
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label htmlFor="last_name">Last name:</label>
                <input 
                    type="text" 
                    id="last_name" 
                    placeholder="Enter last name"
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input 
                    type="text" 
                    id="email" 
                    placeholder="Enter email"
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Password" 
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="employer">Employer:</label>
                <input 
                    type="text" 
                    id="employer" 
                    placeholder="Employer" 
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="clinical_level">Clinical Level:</label>
                <input 
                    type="text" 
                    id="clinical_level" 
                    placeholder="Clinical Level" 
                    onChange={handleChange}
                />
            </div>
            <button type="submit" onClick={handleSubmit}>
                Create account
            </button>
        </form>
    );
}

export default SignUpForm;