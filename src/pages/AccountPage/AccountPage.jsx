import "./AccountPage.css";
import Button from "../../components/Button/Button.jsx";

import useCurrentUser from "../../hooks/use-users.js";
import { useAuth } from "../../hooks/use-auth.js";


function AccountPage() {
    const { auth } = useAuth();
    const { user, isLoading, error } = useCurrentUser(auth.userId, auth.token);

    if (isLoading) {
        return <p>Loading user data...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    if (!user) {
        return <p>User not found.</p>;
    }

    return (
        <div>
            <div className="account-header-section">
                <h2>Account Details</h2>
            </div>
            <div id="account-details">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Employer:</strong> {user.employer}</p>
                <p><strong>Clinical Level:</strong> {user.clinical_level}</p>

                <div className="account-actions">
                    <Button>Update Account</Button>
                    <Button>Delete Account</Button>
                </div>
            </div>
        </div>
    );
}

export default AccountPage;


// const currentUser = user?.find((user) => user.id === auth.userId);