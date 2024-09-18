import Stripe from "stripe";
import { Response, Router } from "express";
import { VerifyTokenRequest } from "./verifyToken";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const router = Router();

router.post("/payment", (req: VerifyTokenRequest, res: Response) => {
  stripe.charges
    .create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    })
    .then((charge) => res.status(200).json(charge))
    .catch((error) => res.status(500).json(error));
});