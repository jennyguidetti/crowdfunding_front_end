import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import "./NavBar.css";
import Header from "../pages/Header.jsx"; 

function NavBar() {
    const {auth, setAuth} = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        setAuth({ token: null });
    };

    console.log(auth)

    return (
        <div className="navbar-container">
            <Header />
            <nav className="navbar">
                <Link to="/">Home</Link>
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