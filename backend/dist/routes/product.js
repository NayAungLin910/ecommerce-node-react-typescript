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
const Product_1 = __importDefault(require("../models/Product"));
const router = (0, express_1.Router)();
router.post("/", verifyToken_1.verifyTokenAndAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = new Product_1.default(req.body);
    try {
        const savedProduct = yield newProduct.save();
        res.status(200).json(savedProduct);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.post("/:id", verifyToken_1.verifyTokenAndAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedProduct = yield Product_1.default.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedProduct);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.delete("/:id", verifyToken_1.verifyTokenAndAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Product_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.get("/find/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findById(req.params.id);
        res.status(200).json(product);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let products;
        if (req.query.new) {
            products = yield Product_1.default.find().sort({ createdAt: -1 }).limit(1);
        }
        else if (req.query.category) {
            products = yield Product_1.default.find({
                categories: { $in: [req.query.category] },
            });
        }
        else {
            products = yield Product_1.default.find();
        }
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
exports.default = router;
