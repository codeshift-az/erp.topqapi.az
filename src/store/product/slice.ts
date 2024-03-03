import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { Product } from "@/types/models";
import { Status } from "@/types/store";

// Actions
import { getProducts, createProduct, updateProduct, deleteProduct } from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: Product[] | null;
  count: number;
}

const initialState: StateProps = {
  status: {
    loading: false,
    success: false,
    failure: false,
    lastAction: null,
  },
  errors: null,
  update: false,
  items: null,
  count: 0,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetState: (state) => {
      state.status = { ...initialState.status };
      state.update = initialState.update;
      state.errors = initialState.errors;
      state.items = initialState.items;
      state.count = initialState.count;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = { ...LOADING, lastAction: getProducts.typePrefix };
        state.errors = null;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getProducts.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getProducts.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getProducts.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = { ...LOADING, lastAction: createProduct.typePrefix };
        state.errors = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createProduct.typePrefix };
        state.update = true;
      })
      .addCase(createProduct.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createProduct.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateProduct.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateProduct.typePrefix };
        state.errors = null;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateProduct.typePrefix };
        state.update = true;
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateProduct.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteProduct.typePrefix };
        state.errors = null;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteProduct.typePrefix };
        state.update = true;
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteProduct.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = productSlice.actions;

export default productSlice.reducer;
