async function postProjects(projectData) {
    const url = `${import.meta.env.VITE_API_URL}/projects/`;
    const token = window.localStorage.getItem("token");
    const response = await fetch(url, {
        method: "POST", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
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
        "date_created": projectData.date_created,
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to create project`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
    }

    export default postProjects;