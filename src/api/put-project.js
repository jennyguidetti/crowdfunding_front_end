async function putProject(projectData, projectId) {
    const url = `${import.meta.env.VITE_API_URL}/projects/${projectId}`;
    const token = window.localStorage.getItem("token");
    const response = await fetch(url, {
        method: "PUT", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
        "organisation_name": projectData.organisation_name,
        "organisation_description": projectData.organisation_description,
        "goal": projectData.goal,
        "image": projectData.image,
        "is_open": projectData.is_open,
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to update project`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
    }

    export default putProject;