import { Response, Router } from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  VerifyTokenRequest,
} from "./verifyToken";
import Cart from "../models/Cart";

const router = Router();

// create cart api
router.post(
  "/",
  verifyToken,
  async (req: VerifyTokenRequest, res: Response) => {
    const newCart = new Cart(req.body);
    try {
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// update cart api
router.put(
  "/:id",
  verifyTokenAndAuthorization,
  async (req: VerifyTokenRequest, res: Response) => {
    try {
      const cart = await Cart.findByIdAndUpdate(
        req.body.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// delete cart api
router.delete(
  "/:id",
  verifyTokenAndAuthorization,
  async (req: VerifyTokenRequest, res: Response) => {
    try {
      await Cart.findByIdAndDelete(req.body.id);
      res.status(200).json("Cart deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// get user id
router.get(
  "/find/:userId",
  verifyTokenAndAuthorization,
  async (req: VerifyTokenRequest, res: Response) => {
    try {
      const cart = await Cart.find({ userId: req.params.userId });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// get all carts
router.get(
  "/",
  verifyTokenAndAdmin,
  async (req: VerifyTokenRequest, res: Response) => {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
      res.json(500).json(err);
    }
  }
);

export default router;
