import mongoose, { Document } from "mongoose";

export interface CartSchemaInterface extends Document {
  userId: string;
  products?: { productId: string; quantity: number }[];
}

const CartSchema = new mongoose.Schema<CartSchemaInterface>(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model<CartSchemaInterface>("Cart", CartSchema);
export default Cart;
