import axios from "axios";

const newRequest = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: "https://backend-rspe.onrender.com/api",
  withCredentials: true,
}); 

export default newRequest;