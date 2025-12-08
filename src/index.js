import mongoose from "mongoose";
import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";


dotenv.config();




connectDB();















/*
import express from "express";

    const app = express();

    (async () => {
        try {
            await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);
            app.on("error", () => {
                console.log("error", error);
                throw error;
            });
            app.listen(process.env.PORT, () => {
                console.log(`Server is running in the port ${process.env.PORT}`);
            });
        } catch (error) {
            console.error("error", error);
            throw error;
        }
    })();
    */
