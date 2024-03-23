import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { FactorySale } from "@/types/models";
import { Status } from "@/types/store";

// Actions
import {
  getFactorySales,
  createFactorySale,
  updateFactorySale,
  deleteFactorySale,
} from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: FactorySale[] | null;
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

export const factorySaleSlice = createSlice({
  name: "factorySale",
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
      .addCase(getFactorySales.pending, (state) => {
        state.status = { ...LOADING, lastAction: getFactorySales.typePrefix };
        state.errors = null;
      })
      .addCase(getFactorySales.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getFactorySales.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getFactorySales.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getFactorySales.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createFactorySale.pending, (state) => {
        state.status = { ...LOADING, lastAction: createFactorySale.typePrefix };
        state.errors = null;
      })
      .addCase(createFactorySale.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createFactorySale.typePrefix };
        state.update = true;
      })
      .addCase(createFactorySale.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createFactorySale.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateFactorySale.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateFactorySale.typePrefix };
        state.errors = null;
      })
      .addCase(updateFactorySale.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateFactorySale.typePrefix };
        state.update = true;
      })
      .addCase(updateFactorySale.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateFactorySale.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteFactorySale.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteFactorySale.typePrefix };
        state.errors = null;
      })
      .addCase(deleteFactorySale.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteFactorySale.typePrefix };
        state.update = true;
      })
      .addCase(deleteFactorySale.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteFactorySale.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = factorySaleSlice.actions;

export default factorySaleSlice.reducer;
