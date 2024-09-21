"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("./verifyToken");
const Order_1 = __importDefault(require("../models/Order"));
const router = (0, express_1.Router)();
// create order
router.post("/", verifyToken_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = new Order_1.default(req.body);
    try {
        const newOrder = yield order.save();
        res.status(200).json(newOrder);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// update order
router.put("/:id", verifyToken_1.verifyTokenAndAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield Order_1.default.findByIdAndUpdate({ id: req.params.id }, { $set: req.body }, { new: true });
        res.status(200).json(order);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// delete order
router.delete("/:id", verifyToken_1.verifyTokenAndAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Order_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted!");
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// get user orders
router.get("/find/:userId", verifyToken_1.verifyTokenAndAuthorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find({ userId: req.params.userId });
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// get all
router.get("/", verifyToken_1.verifyTokenAndAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield Order_1.default.find();
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// get monthly income
router.get("/income", verifyToken_1.verifyTokenAndAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.query.id;
    const twoMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - 2));
    try {
        const lastTwoMonthsIncome = yield Order_1.default.aggregate([
            {
                $match: Object.assign({ createdAt: { $gte: twoMonthsAgo } }, (productId && {
                    products: { $elemMatch: { productId } },
                })),
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
                    totalQuantity: { $sum: "$quantity" },
                },
            },
        ]);
        res.status(200).json(lastTwoMonthsIncome);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
exports.default = router;
