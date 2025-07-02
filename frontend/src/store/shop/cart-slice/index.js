import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isLoading: false,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/add`,
      {
        userId,
        productId,
        quantity,
      },
    );

    return response.data;
  },
);
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/get/${userId}`,
    );

    return response.data;
  },
);
export const updateCartItems = createAsyncThunk(
  "cart/updateCartItem",
  async ({ userId, productId, quantity }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/update-cart`,
      {
        userId,
        productId,
        quantity,
      },
    );

    return response.data;
  },
);
export const deleteCartItems = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/shop/cart/${userId}/${productId}`,
    );

    return response.data;
  },
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //adding item to cart
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(addToCart.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })

      //getting cart items
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })

      //updating cart items
      .addCase(updateCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(updateCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      })

      //deleting cart items
      .addCase(deleteCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data;
      })
      .addCase(deleteCartItems.rejected, (state) => {
        state.isLoading = false;
        state.cartItems = [];
      });
  },
});

export default shoppingCartSlice.reducer;
