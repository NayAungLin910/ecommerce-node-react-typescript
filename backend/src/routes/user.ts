import { Response, Router } from "express";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  VerifyTokenRequest,
} from "./verifyToken";
import User from "../models/User";

const router = Router();

// update
router.put(
  "/:id",
  verifyTokenAndAuthorization,
  async (req: VerifyTokenRequest, res: Response) => {
    req.body.password = req.body.password
      ? CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SEC!
        ).toString()
      : undefined;

    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// delete
router.delete(
  "/:id",
  verifyTokenAndAuthorization,
  async (req: VerifyTokenRequest, res: Response) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been successfully deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// get user
router.get(
  "/find/:id",
  verifyTokenAndAuthorization,
  async (req: VerifyTokenRequest, res: Response) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user?._doc;
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// get all user
router.get(
  "/",
  verifyTokenAndAuthorization,
  async (req: VerifyTokenRequest, res: Response) => {
    try {
      const users = req.query.new
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// get user stats
router.get(
  "/status",
  verifyTokenAndAdmin,
  async (req: VerifyTokenRequest, res: Response) => {
    const lastYear = new Date(
      new Date().setFullYear(new Date().getFullYear() - 1)
    );

    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        { $project: { month: { $month: "createdAt" } } },
        { $group: { _id: "$month", total: { $sum: 1 } } },
      ]);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

export default router;
