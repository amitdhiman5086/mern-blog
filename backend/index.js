import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import userRoute from "./routes/user.route.js";
import authRouter from "./routes/auth.router.js";

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

app.use(cors({
  origin: 'http://localhost:5173', // Allow this specific origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  credentials: true, // Allow credentials (cookies, authorization headers)
}));




app.use(express.json());
app.use("/api/user/routes", userRoute);
app.use("/api/auth/routes", authRouter);

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
