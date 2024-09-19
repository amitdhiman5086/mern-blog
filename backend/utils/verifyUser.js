import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token)
  if (!token) {
    return next(errorHandler(401, "Unauthorized (Token Not Found)"));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized (Token Not Valid)"));

    }
      req.user = user ;
      next()
  });
};
