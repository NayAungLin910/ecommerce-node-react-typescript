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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_1 = require("./verifyToken");
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
// update
router.put("/:id", verifyToken_1.verifyTokenAndAuthorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.password = req.body.password
        ? CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
        : undefined;
    try {
        const updatedUser = yield User_1.default.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedUser);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// delete
router.delete("/:id", verifyToken_1.verifyTokenAndAuthorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been successfully deleted!");
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// get user
router.get("/find/:id", verifyToken_1.verifyTokenAndAuthorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        const _a = user === null || user === void 0 ? void 0 : user._doc, { password } = _a, others = __rest(_a, ["password"]);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// get all user
router.get("/", verifyToken_1.verifyTokenAndAuthorization, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = req.query.new
            ? yield User_1.default.find().sort({ _id: -1 }).limit(5)
            : yield User_1.default.find();
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
// get user stats
router.get("/status", verifyToken_1.verifyTokenAndAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1));
    try {
        const data = yield User_1.default.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            { $project: { month: { $month: "createdAt" } } },
            { $group: { _id: "$month", total: { $sum: 1 } } },
        ]);
    }
    catch (err) {
        return res.status(500).json(err);
    }
}));
exports.default = router;
