import jwt from "jsonwebtoken"
import User from "../models/User.js"
import dotenv from "dotenv";
dotenv.config();

export const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;

        // console.log(token);

        if (!token) {
            return res.status(401).json({ message: " User Unauthorised" });
        }

        const decode = jwt.verify(token, process.env.JWT_KEY);
        // console.log(decode);
        if (!decode) {
            return res.status(401).json({ message: " User Unauthorised - token invalid" });
        }

        const user = await User.findById(decode.userId);
        if (!user) {
            return res.status(404).json({ message: " User Not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protect route middleware", error);
    }
}