import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { Seller } from "@/types/models";
import { Status } from "@/types/store";

// Actions
import { getSellers, createSeller, updateSeller, deleteSeller } from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: Seller[] | null;
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
      .addCase(getSellers.pending, (state) => {
        state.status = { ...LOADING, lastAction: getSellers.typePrefix };
        state.errors = null;
      })
      .addCase(getSellers.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getSellers.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getSellers.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getSellers.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createSeller.pending, (state) => {
        state.status = { ...LOADING, lastAction: createSeller.typePrefix };
        state.errors = null;
      })
      .addCase(createSeller.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createSeller.typePrefix };
        state.update = true;
      })
      .addCase(createSeller.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createSeller.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateSeller.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateSeller.typePrefix };
        state.errors = null;
      })
      .addCase(updateSeller.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateSeller.typePrefix };
        state.update = true;
      })
      .addCase(updateSeller.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateSeller.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteSeller.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteSeller.typePrefix };
        state.errors = null;
      })
      .addCase(deleteSeller.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteSeller.typePrefix };
        state.update = true;
      })
      .addCase(deleteSeller.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteSeller.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = sellerSlice.actions;

export default sellerSlice.reducer;
