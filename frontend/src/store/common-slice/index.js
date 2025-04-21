import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  featureImageList: [],
};

export const getFeatureImages = createAsyncThunk(
  "/addresses/getFeatureImages",
  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/common/feature/get",
    );
    return response.data;
  },
);
export const addFeatureImage = createAsyncThunk(
  "/addresses/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      "http://localhost:5000/api/common/feature/add",
      { image },
    );
    return response.data;
  },
);

export const deleteFeatureImage = createAsyncThunk(
  "/addresses/deleteFeatureImage",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:5000/api/common/feature/delete/${id}`,
    );
    return response.data;
  },
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // === GET FEATURE IMAGES ===
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action?.payload?.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })

      // //=== ADD FEATURE IMAGE ===
      // .addCase(addFeatureImage.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(addFeatureImage.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.featureImageList.push(action?.payload?.data); // Add the new image
      // })
      // .addCase(addFeatureImage.rejected, (state) => {
      //   state.isLoading = false;
      // })

      // === DELETE FEATURE IMAGE ===
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedId = action.payload.data?._id || action.payload._id;

        state.featureImageList = state.featureImageList.filter(
          (img) => img._id !== deletedId,
        );
      });
  },
});

export default commonSlice.reducer;
