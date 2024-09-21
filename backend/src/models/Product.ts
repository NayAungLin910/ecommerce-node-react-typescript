import mongoose, { Document } from "mongoose";

export interface ProductSchemaInterface extends Document {
  title: string;
  desc: string;
  img: string;
  categories: ArrayConstructor;
  size: ArrayConstructor;
  color: ArrayConstructor;
  price: number;
  inStock?: boolean;
}

const ProductSchema = new mongoose.Schema<ProductSchemaInterface>(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
