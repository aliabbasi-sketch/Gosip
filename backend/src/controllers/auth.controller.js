import { sendWelcomingEmail } from "../email/emailHandler.js";
import { generateToken } from "../lib/utils.js";

import User from "../models/User.js"
import cloudinary from "../lib/cloudinary.js"
import bcrypt from "bcryptjs"
import dotenv from "dotenv"

dotenv.config();

export const signup = async (req, res) => {
    const { fullname, email, password } = req.body;

    console.log(fullname, email, password);

    try {
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields must be filled" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 charcters" });
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invlaid email format" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User Already Exist" });
        }

        const salt = await bcrypt.genSalt(10);
        const HashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullname,
            email,
            password: HashedPassword
        });

        if (newUser) {
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);

            res.status(201).json({
                _id: savedUser._id,
                fullname: savedUser.fullname,
                email: savedUser.email,
                profilePic: savedUser.profilePic,
            });



            try {
                await sendWelcomingEmail(savedUser.email, savedUser.fullname, process.env.CLIENT_URL);
            } catch (error) {
                console.error("Failed to send email: ");
            }

        } else {
            return res.status(400).json({ message: "Invalid User Data" });
        }


    } catch (error) {
        console.log("Error in signup controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ message: "Email not found " });
    if (!password) return res.status(400).json({ message: "Password not found" });

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentils" });
        }

        const isPasswordValid = await bcrypt.compare(password ,user.password)
        
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Credentils" });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilePic: user.profilePic,
        });



    } catch (error) {
        console.log("Error in the LOGIN in authController :", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Deleting cookies so that we log out
export const logout =  (_, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out Successfully" });
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        if (!profilePic) {
            return res.status(400).json({ message: "Profile Pic is Requied" });
        } 

        const userId = req.user._id;

        const uploadresponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(userId, {
            profilePic: uploadresponse.secure_url
        }, {
            new : true
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in the Updte Profile Functions", error);
        res.status(500).json({message : "Internal server error"});

    }

}