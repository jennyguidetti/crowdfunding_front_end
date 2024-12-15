import { useState, useEffect } from "react";

import getUser from "../api/get-user.js";

export default function useCurrentUser(userId, token) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getUser(userId, token)
            .then((userData) => {
                setUser(userData);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    }, [userId, token]);

    // Finally, we return the state variables and the error. As the state in this hook changes it will update these values and the component using this hook will re-render
    return { user, isLoading, error };
}