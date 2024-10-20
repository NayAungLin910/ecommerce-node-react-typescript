import { createSlice } from "@reduxjs/toolkit";

export interface ProductCartInterface {
  _id: string;
  title: string;
  desc: string;
  img: string;
  categories: Array<any>;
  size: Array<any>;
  color: string;
  price: number;
  inStock?: boolean;
  createdAt: string;
  updatedAt: string;
  id?: string;
  image?: string;
  quantity: number;
}

export interface CartStateInterface {
  products: ProductCartInterface[];
  quantity: number;
  total: number;
}

const initialState: CartStateInterface = {
  products: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.quantity += action.payload.quantity;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;