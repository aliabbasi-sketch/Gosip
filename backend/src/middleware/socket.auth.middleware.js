import jwt from "jsonwebtoken"
import User from "../models/User.js"
import dotenv from "dotenv"

dotenv.config()

export const socketAuthMiddleware = async (socket, next) => {
    try {

        const token = socket.handshake.headers.cookie
            ?.split("; ")
            .find((row) => row.startsWith("jwt="))
            ?.split("=")[1];

        if (!token) {
            console.log("Socket conection Rejected: No token Present");
            return next(new Error("Unauthorized - No token Provided"));
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY)
        if (!decoded) {
            console.log("Socket conection Rejected: Invalid token");
            return next(new Error("Unauthorized - Invalid token"));
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            console.log("Socket conection Rejected: User Not Found");
            return next(new Error("User Not Found"));
        }

        socket.user = user;
        socket.userId = user._id.toString()

        console.log(`Socket athenticated for User: ${user.fullname} (${user._id})`);
        next()

    } catch (error) {
        console.log("Error in Socket Authentication Middleware: ", error.message);
        return next(new Error("Unauthorized - Authentication failed"));
    }
};