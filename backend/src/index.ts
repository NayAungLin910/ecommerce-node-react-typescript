import express from "express";
import mongoose from "mongoose";

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

app.get('/sure', async (req, res) => {
    res.send("Sending something!")
})

app.listen(process.env.PORT || 5000, () => {
    console.log("Express is listening...")
})