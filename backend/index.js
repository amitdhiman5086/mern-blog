import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";

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

app.use("/api/user/routes", userRoute);

app.listen(3000, () => {
  console.log("Hii I am Listening At Port 3000!!");
});
