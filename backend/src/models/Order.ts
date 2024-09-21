import mongoose, { Document } from "mongoose";

export interface OrderSchemaInterface extends Document {
  userId: string;
  products?: { productId: string; quantity: number };
  amount: number;
  address: object;
  status: string;
}

const OrderSchema = new mongoose.Schema<OrderSchemaInterface>(
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
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Order = mongoose.model<OrderSchemaInterface>("Order", OrderSchema);
export default Order;
