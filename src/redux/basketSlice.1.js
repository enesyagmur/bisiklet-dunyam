import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "basket",
  initialState: {
    basketProducts: [],
  },
  reducers: {
    productAddToBasket: (state, action) => {
      const basketProduct = action.payload;

      // aynı üründen sepette var mı
      if (basketProduct.productBasketCount) {
        state.basketProducts.map((product) => {
          if (product.id === basketProduct.id) {
            product.productBasketCount++;
          }
        });
      } else {
        const changeProduct = {
          id: basketProduct.id,
          productName: basketProduct.productName,
          productPrice: basketProduct.productPrice,
          productDetail: basketProduct.productDetail,
          productImage: basketProduct.productImage,
          productRecommended: basketProduct.productRecommended,
          productStock: basketProduct.productStock,
          productCategory: basketProduct.productCategory,
          productBasketCount: 1,
        };
        state.basketProducts.push(changeProduct);
      }
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
