import { configureStore } from "@reduxjs/toolkit";
import basketSlice from "./basketSlice.js";
import productsSlice from "./productsSlice.js";
import userSlice from "./userSlice.js";

export const store = configureStore({
  reducer: {
    basket: basketSlice,
    products: productsSlice,
    user: userSlice,
  },
});
