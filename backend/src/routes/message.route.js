import express from "express";
import { getAllContacts, getMessagesById, sendMessage, getChatPartners } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

router
    .use( arcjetProtection ,protectRoute)
    .get("/contacts" ,getAllContacts)
    .get("/chats" ,getChatPartners)
    .get("/:id" ,getMessagesById)
    .post("/send/:id" ,sendMessage)





export default router;