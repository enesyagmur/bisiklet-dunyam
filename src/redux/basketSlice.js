import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basketProducts: [],
  },
  reducers: {
    productAddToBasket: (state, action) => {
      state.basketProducts.push(action.payload);
    },
    productDeleteFromBasket: (state, action) => {
      const newBasket = state.basketProducts.filter(
        (item) => item.productId !== action.payload
      );
      state.basketProducts = [...newBasket];
    },
    clearBasket: (state) => {
      state.basketProducts = [];
    },
  },
});

export const { productAddToBasket, productDeleteFromBasket, clearBasket } =
  basketSlice.actions;
export default basketSlice.reducer;
