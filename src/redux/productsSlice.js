import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    allProductsList: [],
  },
  reducers: {
    addProductsToRedux: (state, action) => {
      state.allProductsList = [...action.payload];
    },
  },
});

export const { addProductsToRedux } = productsSlice.actions;
export default productsSlice.reducer;
