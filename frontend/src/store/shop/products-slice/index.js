import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

export const fetchFilteredProducts = createAsyncThunk(
  "/products/fetchproducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({ ...filterParams, sortBy: sortParams });

    const result = await axios.get(
      `http://localhost:5000/api/shop/products/getproducts?${query}`,
    );
    return result?.data;
  },
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/getproducts/${id}`,
    );
    return result?.data;
  },
);

const ShoppingProductsSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //filtered products.
      .addCase(fetchFilteredProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        // console.log(action.payload);
        (state.isLoading = false), (state.productList = action?.payload?.data);
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      })

      //for product details:

      .addCase(fetchProductDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        // console.log(action.payload);
        (state.isLoading = false),
          (state.productDetails = action?.payload?.data);
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});
export default ShoppingProductsSlice.reducer;
