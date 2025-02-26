import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">
                    <img src="/img/logo.png" alt="Logo" />
                </Link>
            </div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/projectsall">Services</Link>
                <Link to="/signup">Sign Up</Link>
                <Link to="/login">Login</Link>
            </div>
            <div className="red-line"></div>
        </nav>
    );
}

export default Navbar; 