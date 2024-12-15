import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postLogin from "../api/post-login.js";
import { useAuth } from "../hooks/use-auth.js"
import postSignUp from "../api/post-sign-up.js";

import Button from "./Button/Button.jsx";

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
                    window.localStorage.setItem("userId", response.user_id);
                    setAuth({
                        token: response.token,
                        userId: response.user_id,
                    });
                    navigate("/");
                });
            });
        }
    };

    return (
        <div className="form-container">
        <div className="form-header-section">
            <h2>Sign Up</h2>
        </div>
        <form className="signup-form">
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    placeholder="Enter username"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="first_name">First Name:</label>
                    <input
                        type="text"
                        id="first_name"
                        placeholder="Enter first name"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name:</label>
                    <input
                        type="text"
                        id="last_name"
                        placeholder="Enter last name"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-actions">
                    <Button type="submit" onClick={handleSubmit}>
                        Sign Up
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignUpForm;