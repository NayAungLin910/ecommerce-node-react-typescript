import { Response, Router } from "express";
import { verifyTokenAndAdmin, VerifyTokenRequest } from "./verifyToken";
import Product from "../models/Product";

const router = Router();

// create product
router.post(
  "/",
  verifyTokenAndAdmin,
  async (req: VerifyTokenRequest, res: Response) => {
    const newProduct = new Product(req.body);
    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// update product
router.post(
  "/:id",
  verifyTokenAndAdmin,
  async (req: VerifyTokenRequest, res: Response) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// delete product
router.delete(
  "/:id",
  verifyTokenAndAdmin,
  async (req: VerifyTokenRequest, res: Response) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// get product
router.get("/find/:id", async (req: VerifyTokenRequest, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all products
router.get("/", async (req: VerifyTokenRequest, res: Response) => {
  try {
    let products;
    if (req.query.new) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (req.query.category) {
      products = await Product.find({
        categories: { $in: [Number(req.query.category)] },
      });
    } else {
      products = await Product.find();
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
