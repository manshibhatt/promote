import axios from "axios";

const newRequest = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: "https://promote-backend.onrender.com/api",
  withCredentials: true,
}); 

export default newRequest;