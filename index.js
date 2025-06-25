import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Database/dbConfig.js";
import authRoutes from "./Routes/auth.Routes.js";

//1.Load environmental variables
dotenv.config();

//2.Connect to MongoDB
connectDB();

//3.Create app instance
const app = express();

//4.Middlewares
app.use(express.json());
app.use(cors());

//5.Routes
app.use("/api", authRoutes);    //This line connects your forgot-password route

//6.Test Route
app.get("/", (req,res)=>{
    res.send("Password Reset Flow API is running...");
});

//7.Start the server
const Port = process.env.PORT || 4000;
app.listen(Port, ()=>{
    console.log(`Server started and running on the ${Port}`);
});