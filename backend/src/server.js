import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";

import auth_routes from "./routes/auth.route.js";
import message_routes from "./routes/message.route.js";

import { connect_to_DB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

dotenv.config();


const _directory_Path = path.resolve();
const PORT = process.env.PORT;

app.use(express.json({limit: "2mb"}));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(cookieParser());

app.use("/api/auth", auth_routes);
app.use("/api/messages", message_routes);

if (process.env.STATUS == "PRODUCTION") {
    app.use(express.static(path.join(_directory_Path, "../frontend/dist")));
    app.get("", (req, res) => {
        res.sendFile(path.join(_directory_Path, "../frontend/dist/index/js"));
    });
}


server.listen(PORT, () => {
    console.log("Server started at port : " + PORT);
    connect_to_DB();
});