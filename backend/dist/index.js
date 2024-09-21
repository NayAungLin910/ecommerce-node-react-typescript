"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("./routes/auth"));
const cart_1 = __importDefault(require("./routes/cart"));
const product_1 = __importDefault(require("./routes/product"));
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
app.use("/api/auth", auth_1.default);
app.use("/api/carts", cart_1.default);
app.use("/api/products", product_1.default);
app.listen(process.env.PORT || 5000, () => {
    console.log("Express is listening...");
});
