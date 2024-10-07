import { createSlice } from "@reduxjs/toolkit";

export interface CartStateInterface {
  products: { productId: string; quantity: number }[];
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
      state.quantity += 1;
      state.products.push(action.payload.product);
      state.total += action.payload.price;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
