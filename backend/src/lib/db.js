import mongoose from "mongoose"

export const connect_to_DB = async () => {
    try {
        console.log("Trying to connect to DB :", (process.env.MONGO_DB_URL).split("/").pop().split("?")[0]);
        const con = await mongoose.connect(process.env.MONGO_DB_URL);
        console.log("Database connected: " + con.connection.host);
    } catch (error) {
        console.log("Error Connecting to Mongo DB:", error);
        process.exit(1);
    }
}