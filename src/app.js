import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" })); // to accept json data at limit of 16kb

app.use(express.urlencoded({ extended: true, limit: "16kb" })); // to accept form data even objects
app.use(express.static("public")); // to serve static files like images ,css
app.use(cookieParser()); // to parse cookies from request headers

// Routes Import

import userRouter from "./routes/user.routers.js";
app.use("/api/v1/users", userRouter);
export { app };
