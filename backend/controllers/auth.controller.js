import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "Please Enter Valid Inputs"));
  }
  try {
    const validUser = await User.findOne({ email });
    console.log(validUser);
    if (!validUser) {
      return next(errorHandler(400, "User Not Found !"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Password !"));
    }
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT,
      { expiresIn: "30d" }
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access-token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    console.log(error);
  }
};