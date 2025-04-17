import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addProductReview = createAsyncThunk(
  "/order/addProductReview",
  async (formData) => {
    const response = await axios.post(
      `http://localhost:5000/api/shop/review/add`,
      formData,
    );
    return response.data;
  },
);
export const getProductReviews = createAsyncThunk(
  "/order/getProductReviews",
  async (id) => {
    const response = await axios.get(
      `http://localhost:5000/api/shop/review/${id}`,
    );
    return response.data;
  },
);

const reviewSlice = createSlice({
  name: "reivewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getProductReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
