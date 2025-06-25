import User from "../Models/User.Model.js";    //brings in our users from DB
import crypto from "crypto";      //helps us generate a secret token
import sendEmail from "../Utils/send.Email.js";   //we'll use this to send email
import bcrypt from "bcryptjs";               //used for hashing password
import jwt from "jsonwebtoken";            //used for generate a token for middleware (check)


//Register controller
export const registerUser = async(req,res)=>{
    try {
        const {name, email, password} = req.body;
        console.log(req.body);
        //check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        //Hash the password 
        const salt = await bcrypt.genSalt(10);             //10=> saltrounds
        const hashedPassword = await bcrypt.hash(password, salt);        //hash the password

        //create the new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        //Save to database
        await newUser.save();

        res.status(201).json({message: "User registered successfully!"});
    } catch (error) {
        res.status(500).json({message: "Registration failed", error:error.message});
    }
};


//Login controller
export const loginUser = async(req,res)=>{
    try {
        const {email, password} = req.body;
        
        //1.Check if user exists
        const user = await User.findOne({email});
        if(!user){
            res.status(404).json({message: "User Not Found"});
        }

        //2. Compare entered password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(401).json({message: "Invalid credentials"});
        }

        //3.Generate JWT token
        const token = jwt.sign({
        userId: user._id,
        }, process.env.JWT_SECRET, {expiresIn: "1h"});
        
        //4.Send response
        res.status(200).json({message: "Login successful", token, user:{              
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
    } catch (error) {
        res.status(500).json({message: "Login Failed", error: error.message});
    }
};


export const forgotPassword = async(req, res)=>{
    try {
        const {email} = req.body;               //1. Get the email from the user
        //2. Check if this email exixts in the database
        const user = await User.findOne({email});
        if(!user){
            return
            res.status(404).json({message: "User not found"});
        }
        
        //3.Create a secret token (like a one-time key)
        const token = crypto.randomBytes(32).toString("hex");

        //4.Save that token & set expiry (e.g., valid for 15 mins)
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
        await user.save();   //Save the user with token info

        //5.Create a special reset link with the token
        const resetLink = `http://localhost:5173/reset-password/${token}`;   //This will be used by React

        // console.log(resetLink);

        //6.Send an email with that reset link
        await sendEmail(user.email,
            "Reset Your Password",
            `Click this link to reset your password: ${resetLink}`
        );
        //7.Send success message back
        res.status(200).json({message: "Reset link sent to your email"});
    } catch (error) {
        // If something goes wrong
        res.status(500).json({message: "Error sending reset link", error: error.message});
    }
};


export const resetPassword = async(req, res)=>{
    try {
        const {token} = req.params;
        const {newPassword} = req.body;

        //1.Find the user with matching token & not expired
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: {$gt:
                Date.now()   //check expiry
            },
        });

        if(!user){
           return  res.status(400).json({message: "Invalid or expired token"});
        }

        //2.Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        //3.Update the user's password
        user.password = hashedPassword;

        //4. Remove the reset token & expiry
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;

        await user.save();

        res.status(200).json({message: "Password has been reset successfully"});
    } catch (error) {
        res.status(500).json({message: "Error resetting password", error: error.message});
    }
};


//logout controller
export const logoutUser = (req,res)=>{
    // This is just for structure.
    // Frontend should delete the token.
    res.status(200).json({message: "Logged out successfully"});
};