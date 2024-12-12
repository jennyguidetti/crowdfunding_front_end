import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth.js";
import "./NavBar.css";

function NavBar() {
    const {auth, setAuth} = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        setAuth({ token: null });
    };

    console.log(auth)

    return (
        <div className="navbar-container">
            <div className="logo">
                <Link to="/">
                    <img src="./img/logo.png" alt="Logo" />
                </Link>
            </div>
            <nav className="navbar">
                <Link to="/">Home</Link>
                <Link to="/projectsall">Projects</Link>
                <Link to="user">Account</Link>
                {auth.token ? (
                    <>
                        <Link to="/projects">Create Project</Link>
                        <Link to="/" onClick={handleLogout}>
                            Log Out
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/signup">Sign Up</Link>
                        <Link to="/login">Login</Link>
                    </>
                )} 
            </nav>
            <Outlet />
        </div>
    );
}

export default NavBar;