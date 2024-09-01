import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res) => {
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
    return res.status(400).json({
      message: "Please Enter Valid Input",
    });
  }

  const hashPassword = await bcryptjs.hashSync(password,10)
//  console.log(hashPassword)
  const newUser = new User({
    username : username,
    email : email,
    password : hashPassword,
  });
  // console.log(newUser)
  try {
    await newUser.save() ;
    res.json("New User Created",);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
 
};
