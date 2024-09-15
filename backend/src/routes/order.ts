import { Response, Router } from "express";
import {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  VerifyTokenRequest,
} from "./verifyToken";
import Order from "../models/Order";

const router = Router();

// create order
router.post(
  "/",
  verifyToken,
  async (req: VerifyTokenRequest, res: Response) => {
    const order = new Order(req.body);
    try {
      const newOrder = await order.save();
      res.status(200).json(newOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// update order
router.put(
  "/:id",
  verifyTokenAndAdmin,
  async (req: VerifyTokenRequest, res: Response) => {
    try {
      const order = await Order.findByIdAndUpdate(
        { id: req.params.id },
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// delete order
router.delete(
  "/:id",
  verifyTokenAndAdmin,
  async (req: VerifyTokenRequest, res: Response) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// get user orders
router.get(
  "/find/:userId",
  verifyTokenAndAuthorization,
  async (req: VerifyTokenRequest, res: Response) => {
    try {
      const orders = await Order.find({ userId: req.params.userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// get all
router.get(
  "/",
  verifyTokenAndAdmin,
  async (req: VerifyTokenRequest, res: Response) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// get monthly income
router.get(
  "/income",
  verifyTokenAndAdmin,
  async (req: VerifyTokenRequest, res: Response) => {
    const productId = req.query.id;
    const twoMonthsAgo = new Date(
      new Date().setMonth(new Date().getMonth() - 2)
    );

    try {
      const lastTwoMonthsIncome = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: twoMonthsAgo },
            ...(productId && {
              products: { $elemMatch: { productId } },
            }),
          },
        },
        {
          $unwind: "$products",
        },
        {
          $match: {
            "products.productId": productId,
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
            quantity: { $toInt: "$products.quantity" },
          },
        },
        {
          $group: {
            _id: {
              month: "$month",
              year: "$year",
            },
            totalQuantity: { $sum: "$quantity" as any },
          },
        },
      ]);
      res.status(200).json(lastTwoMonthsIncome);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

export default router;
