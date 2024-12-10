import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src="./img/logo1.png" alt="Logo" />
                </Link>
            </div>
        </header>
    );
}

export default Header;