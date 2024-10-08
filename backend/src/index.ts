import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth";
import cartRouter from "./routes/cart";
import productRouter from "./routes/product";
import userRouter from "./routes/user";

const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => console.log("Connected to mongodb successfully!"))
  .catch((err) => console.log(err));

const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/carts", cartRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Express is listening...");
});
