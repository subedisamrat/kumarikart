import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      formData,
      {
        withCredentials: true,
      },
    );
    return res.data;
  },
);
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
    formData,
    {
      withCredentials: true,
    },
  );
  return res.data;
});

export const logoutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      },
    );

    return res.data;
  },
);

//If you use cookie then use this✅

// export const checkAuth = createAsyncThunk(
//   "/auth/checkauth",

//   async () => {
//     const res = await axios.get(
//       `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
//       {
//         withCredentials: true,
//         headers: {
//           "Cache-Control": "no-cache, no-store",
//           Pragma: "no-cache",
//           Expires: "0",
//         },
//       },
//     );

//     return res?.data;
//   },
// );

//If have sub-domain then use this✅
export const checkAuth = createAsyncThunk(
  "/auth/checkauth",

  async (token) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/auth/check-auth`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
          "Cache-Control": "no-cache, no-store",
          Pragma: "no-cache",
          Expires: "0",
        },
      },
    );

    return res?.data;
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
    resetTokenaAndCredentials: (state) => {
      (state.isAuthenticated = false), (state.user = null);
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder

      //for registering users:
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      //for logging users:

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        //console.log(action);
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success || false;
        state.token = action.payload.token;
        sessionStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.token = null;
      })

      //for middlewares:

      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success || false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, resetTokenaAndCredentials } = authSlice.actions;
export default authSlice.reducer;
