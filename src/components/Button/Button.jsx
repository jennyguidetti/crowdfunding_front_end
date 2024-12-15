import "./Button.css";

function Button({ children, onClick, type = "button" }) {
    return (
        <button 
            className="custom-button" 
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
}

export default Button;