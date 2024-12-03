async function postSignUp(username, first_name, last_name, email, password, employer, clinical_level) {
    const url = `${import.meta.env.VITE_API_URL}/users/`;
    const response = await fetch(url, {
      method: "POST", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "username": username,
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "password": password,
        "employer": employer,
        "clinical_level": clinical_level,
      }),
    });
  
    if (!response.ok) {
      const fallbackError = `Error trying to sign up`;
  
      const data = await response.json().catch(() => {
        throw new Error(fallbackError);
      });
  
      const errorMessage = data?.detail ?? fallbackError;
      throw new Error(errorMessage);
    }
  
    return await response.json();
  }
  
  export default postSignUp;