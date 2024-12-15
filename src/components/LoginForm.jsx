import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postLogin from "../api/post-login.js";
import { useAuth } from "../hooks/use-auth.js"

import Button from "./Button/Button.jsx";

function LoginForm() {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();

    const [credentials, setCredentials] = useState({
        username:"",
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
        if (credentials.username && credentials.password) {
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
        }
    };

    return (
            <div className="form-container">
            <div className="form-header-section">
                <h2>Login</h2>
            </div>
            <form className="login-form">
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
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter password"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-actions">
                    <Button type="submit" onClick={handleSubmit}>
                        Login
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;