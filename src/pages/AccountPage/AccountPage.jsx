import "./AccountPage.css";

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

    if (!currentUser) {
        return <p>User not found.</p>;
    }

    return (
        <div id="account-details">
            <h2>Account Details</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Username:</strong> {user.username}</p>

            <div className="account-actions">
                <button>Update Account</button>
                <button>Delete Account</button>
            </div>
        </div>
    );
}

export default AccountPage;


// const currentUser = user?.find((user) => user.id === auth.userId);