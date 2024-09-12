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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = require("dotenv");
dotenv.config();
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to mongodb successfully!"))
    .catch((err) => console.log(err));
const cors = require("cors");
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
app.get('/sure', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Sending something!");
}));
app.listen(process.env.PORT || 5000, () => {
    console.log("Express is listening...");
});
