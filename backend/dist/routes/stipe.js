"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const express_1 = require("express");
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const router = (0, express_1.Router)();
router.post("/payment", (req, res) => {
    stripe.charges
        .create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
    })
        .then((charge) => res.status(200).json(charge))
        .catch((error) => res.status(500).json(error));
});
