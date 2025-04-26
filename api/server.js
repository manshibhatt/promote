import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser"; 
import authRoute from "./routes/auth.route.js";
import businessRoute from "./routes/business.route.js"
import postRoute from "./routes/post.route.js"
import userRoute from "./routes/user.route.js"


const app = express();  
dotenv.config(); 

const connect = async()=>{
try{
    await mongoose.connect(process.env.MONGO)
    console.log("Connected to MongoDB"); 

} 
catch(error){
  // handleError(error);
  console.log(error);
}
}; 
 
app.use(express.json());
app.use(cookieParser()); 



app.use(cors({
  origin: "http://localhost:5173", // Change this to your frontend URL
  credentials: true // Allow cookies & authorization headers
}));
 
app.use("/api/auth", authRoute);
app.use("/api/business",businessRoute);
app.use("/api/posts",postRoute);
app.use("/api",userRoute);

app.use((err, req, res, next) => {
  console.log(err);
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

 

app.listen(8000, () => { 
  connect();
  console.log("Backend server is running on port 8000!");
});





