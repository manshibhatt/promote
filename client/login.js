import axios from "axios";

const loginUser = async (email, password) => {
    try {
        const response = await axios.post("http://localhost:8000/api/login", { email, password });

        // Store token in localStorage
        localStorage.setItem("token", response.data.session.access_token);

        console.log("Login Successful:", response.data);
    } catch (error) {
        console.error("Login Failed:", error.response.data);
    }
};
