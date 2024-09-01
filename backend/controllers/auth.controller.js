import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signUp = async (req, res, next) => {
  // console.log(req.body);
  const { username, email, password } = req.body;
  if (
    !username ||
    !password ||
    !email ||
    username === "" ||
    password === "" ||
    email === ""
  ) {
    next(errorHandler(400, "Please Enter Vaild Inputs"));
  }

  const hashPassword = await bcryptjs.hashSync(password, 10);
  //  console.log(hashPassword)
  const newUser = new User({
    username: username,
    email: email,
    password: hashPassword,
  });
  // console.log(newUser)
  try {
    await newUser.save();
    res.json({ message: "New User Created" });
  } catch (error) {
    next(error);
  }
};
