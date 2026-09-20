import express from "express";

import {signup, login, logout, updateProfile} from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"
import { arcjetProtection } from "../middleware/arcjet.middleware.js";


const router = express.Router();

router.use(arcjetProtection);

router
    .post("/signup", signup)
    .post("/login", login)
    .post("/logout", logout)
    .put("/update-profile", protectRoute, updateProfile)
    .get("/check", protectRoute, (req, res) => res.status(200).json(req.user));

export default router; 

