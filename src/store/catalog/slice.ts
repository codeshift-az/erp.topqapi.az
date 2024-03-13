import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { ProductRecord } from "@/types/models";
import { Status } from "@/types/store";

// Actions
import {
  getProductRecords,
  createProductRecord,
  updateProductRecord,
  deleteProductRecord,
} from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: ProductRecord[] | null;
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

export const sellerSlice = createSlice({
  name: "seller",
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
      .addCase(getProductRecords.pending, (state) => {
        state.status = { ...LOADING, lastAction: getProductRecords.typePrefix };
        state.errors = null;
      })
      .addCase(getProductRecords.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getProductRecords.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getProductRecords.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getProductRecords.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createProductRecord.pending, (state) => {
        state.status = { ...LOADING, lastAction: createProductRecord.typePrefix };
        state.errors = null;
      })
      .addCase(createProductRecord.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createProductRecord.typePrefix };
        state.update = true;
      })
      .addCase(createProductRecord.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createProductRecord.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateProductRecord.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateProductRecord.typePrefix };
        state.errors = null;
      })
      .addCase(updateProductRecord.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateProductRecord.typePrefix };
        state.update = true;
      })
      .addCase(updateProductRecord.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateProductRecord.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteProductRecord.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteProductRecord.typePrefix };
        state.errors = null;
      })
      .addCase(deleteProductRecord.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteProductRecord.typePrefix };
        state.update = true;
      })
      .addCase(deleteProductRecord.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteProductRecord.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = sellerSlice.actions;

export default sellerSlice.reducer;
