import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface VerifyTokenRequestInterface extends Request {
  user: any;
}

export const verifyToken = (
  req: VerifyTokenRequestInterface,
  res: Response,
  next: () => void
) => {
  const authHeader = req.headers.token;

  if (authHeader && typeof authHeader === "string") {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC!, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("You are not authenticated!");
  }
};

export const verifyTokenAndAuthorization = (
  req: VerifyTokenRequestInterface,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed!");
    }
  });
};

export const verifyTokenAndAdmin = (
  req: VerifyTokenRequestInterface,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed!");
    }
  });
};
