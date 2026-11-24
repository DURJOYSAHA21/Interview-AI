import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth", // Set the base URL for the backend API
    withCredentials: true, // Include cookies in requests for authentication
});
export async function register({name, email, password}) { // Function to register a new user and passing the name, email, and password as parameters in object destructuring
    try {
        const response = await api.post("/register", { name, email, password });
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export async function login({email, password}) { // Function to login a user and passing the email and password as parameters in object destructuring
    try {
        const response = await api.post("/login", { email, password });
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}

export async function logout() {
    try {
        const response = await api.get("/logout");
        return response.data;
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
}

// Function to verify the user's authentication status by sending a GET request to the backend API. The withCredentials option is set to true to include cookies in the request.
export async function verify() {
    try {
        const response = await api.get("/verify");
        return response.data;
    } catch (error) {
        console.error("Error verifying user:", error);
        throw error;
    }
}