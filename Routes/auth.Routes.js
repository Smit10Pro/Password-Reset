//This file sets up the route for forgot password
import express from "express";
import { forgotPassword, loginUser, logoutUser, registerUser, resetPassword } from "../Controllers/auth.Controller.js";

const router = express.Router();

//register route
router.post("/register", registerUser);

//login route
router.post("/login", loginUser);

//When someone POSTs to /api/forgot password, run forgotPassword logic
router.post("/forgot-password", forgotPassword);

//reset password route
router.post("/reset-password/:token", resetPassword);

//logout route
router.post("/logout", logoutUser)

export default router;