import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";

interface CustomJwtPayload {
  id: string;
}

interface CustomRequest extends Request {
  user?: any;
}

const protect = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header. the format is: bearer <token>. we need to split it  and get the token only
      token = req.headers.authorization.split(" ")[1];

      // decode and verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!,
      ) as CustomJwtPayload;

      // get user data from token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export default protect;
