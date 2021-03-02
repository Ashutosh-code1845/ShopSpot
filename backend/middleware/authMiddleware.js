import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/users.js";
import AsyncHandler from "express-async-handler";

const protect = AsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
      //this will return a object which is our JWT payload
      req.user = await User.findById(decoded.id).select("-password");
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorised, Token Failed");
    }
  if (!token) {
    res.status(401);
    throw new Error("Not authorised as no token");
  }
  next();
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Sorry!! You are not an Admin");
  }
};

export { protect, admin };
