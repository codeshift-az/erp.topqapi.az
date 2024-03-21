import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { FactoryProduct } from "@/types/models";
import { Status } from "@/types/store";

// Actions
import {
  getFactoryProducts,
  createFactoryProduct,
  updateFactoryProduct,
  deleteFactoryProduct,
} from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: FactoryProduct[] | null;
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

export const factoryProductSlice = createSlice({
  name: "factoryProduct",
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
      .addCase(getFactoryProducts.pending, (state) => {
        state.status = { ...LOADING, lastAction: getFactoryProducts.typePrefix };
        state.errors = null;
      })
      .addCase(getFactoryProducts.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getFactoryProducts.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getFactoryProducts.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getFactoryProducts.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createFactoryProduct.pending, (state) => {
        state.status = { ...LOADING, lastAction: createFactoryProduct.typePrefix };
        state.errors = null;
      })
      .addCase(createFactoryProduct.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createFactoryProduct.typePrefix };
        state.update = true;
      })
      .addCase(createFactoryProduct.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createFactoryProduct.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateFactoryProduct.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateFactoryProduct.typePrefix };
        state.errors = null;
      })
      .addCase(updateFactoryProduct.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateFactoryProduct.typePrefix };
        state.update = true;
      })
      .addCase(updateFactoryProduct.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateFactoryProduct.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteFactoryProduct.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteFactoryProduct.typePrefix };
        state.errors = null;
      })
      .addCase(deleteFactoryProduct.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteFactoryProduct.typePrefix };
        state.update = true;
      })
      .addCase(deleteFactoryProduct.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteFactoryProduct.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = factoryProductSlice.actions;

export default factoryProductSlice.reducer;
