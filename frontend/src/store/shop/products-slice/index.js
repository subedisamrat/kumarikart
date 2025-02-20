import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
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

const ShoppingProductsSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});
export default ShoppingProductsSlice.reducer;
