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
    return next(errorHandler(400, "Please Enter Vaild Inputs"));
  }

  const hashPassword = await bcryptjs.hash(password, 10);
  //  console.log(hashPassword)
  const newUser = new User({
    username: username,
    email: email,
    password: hashPassword,
  });
  // console.log(newUser)
  try {
    const data = await newUser.save();
    // res.json({ message: "New User Created" });
    // console.log(data);

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT,
      { expiresIn: "30d" }
    );
    const { password: pass, ...rest } = newUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict", // Protect against CSRF
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      })
      .json(rest);
  } catch (error) {
    console.log(error);

    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(400, "Please Enter Valid Inputs"));
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
        isAdmin: validUser.isAdmin,
      },
      process.env.JWT,
      { expiresIn: "30d" }
    );
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict", // Protect against CSRF
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      })
      .json(rest);
  } catch (error) {
    console.log(error);
  }
};

// export const google = async (req, res, next) => {
//   const { email, name, goolePhotoUrl } = req.body;
//   try {
//     const user = await User.findOne({ email });

//     if (user) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT);
//       const { password, ...rest } = user._doc;

//       res
//       .status(200)
//       .cookie("access_token", token, {
//         httpOnly: true,
//       })
//       .json(rest);
//     }
//   } catch (error) {
//     const generatedPassword =
//     Math.random().toString(36).slice(-8) +
//     Math.random().toString(36).slice(-8);
//     const hashPassword = await bcryptjs.hashSync(generatedPassword, 10);
//     const newUser = new User({
//       username:
//         name.toLowerCase().split(" ").join("") +
//         Math.random().toString(9).slice(-4),
//       email,
//       password: hashPassword,
//       profilePicture: goolePhotoUrl,
//     });
//     await newUser.save();
//     const token = jwt.sign({ id: newUser._id }, process.env.JWT);
//     const { password, ...rest } = newUser._doc;
//     res
//       .status(200)
//       .cookie("access_token", token, {
//         httpOnly: true,
//       })
//       .json(rest);
//   }
// };
export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body; // typo fix: 'goolePhotoUrl' to 'googlePhotoUrl'
  try {
    const user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT
      );
      const { password, ...rest } = user._doc;

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Use secure cookies in production
          sameSite: "strict", // Protect against CSRF
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      // const hashPassword = await bcryptjs.hashSync(generatedPassword, 10);
      const hashPassword = await bcryptjs.hash(generatedPassword, 10);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashPassword,
        profilePicture: googlePhotoUrl, // typo fix
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id  , isAdmin : newUser.isAdmin}, process.env.JWT);
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Use secure cookies in production
          sameSite: "strict", // Protect against CSRF
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        })
        .json(rest);
    }
  } catch (error) {
    console.log(error); // Log the error for more details
    next(errorHandler(500, "Google authentication failed"));
  }
};
