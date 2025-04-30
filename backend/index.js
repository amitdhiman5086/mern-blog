import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import authRouter from "./routes/auth.router.js";
import postRouter from "./routes/post.route.js";
import commentRoutes from "./routes/comment.router.js";
import cookieParser from "cookie-parser";
import path from "path";
import job from "./utils/cron.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
job.start();

const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://16.171.170.206", // Allow this specific origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/user/routes", userRoute);
app.use("/api/auth/routes", authRouter);
app.use("/api/post/routes", postRouter);
app.use("/api/comment/routes", commentRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Error Happend!";
  res.status(statusCode).json({
    message: message,
    success: false,
    statusCode,
  });
});

app.listen(3000, () => {
  console.log("Hii I am Listening At Port 3000!!");
});
