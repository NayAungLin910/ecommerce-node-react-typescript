import { Request, Response } from "express";
import User, { UserSchemaInterface } from "../models/User";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export const postRegister = async (req: Request, res: Response) => {
  const newUser: UserSchemaInterface = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC!
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const postLogin = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    !user && res.status(401).json("Wrong credentials!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user!.password,
      process.env.PASS_SEC!
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json("Wrong Credentials!");

    const accessToken = jwt.sign(
      {
        id: user?._id,
        isAdmin: user?.isAdmin,
      },
      process.env.JWT_SEC!,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user?._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};
