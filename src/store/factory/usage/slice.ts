import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { FactoryUsage } from "@/types/models";
import { Status } from "@/types/store";

// Actions
import {
  getFactoryUsages,
  createFactoryUsage,
  updateFactoryUsage,
  deleteFactoryUsage,
} from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: FactoryUsage[] | null;
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

export const factoryUsageSlice = createSlice({
  name: "factoryUsage",
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
      .addCase(getFactoryUsages.pending, (state) => {
        state.status = { ...LOADING, lastAction: getFactoryUsages.typePrefix };
        state.errors = null;
      })
      .addCase(getFactoryUsages.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getFactoryUsages.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getFactoryUsages.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getFactoryUsages.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createFactoryUsage.pending, (state) => {
        state.status = { ...LOADING, lastAction: createFactoryUsage.typePrefix };
        state.errors = null;
      })
      .addCase(createFactoryUsage.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createFactoryUsage.typePrefix };
        state.update = true;
      })
      .addCase(createFactoryUsage.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createFactoryUsage.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateFactoryUsage.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateFactoryUsage.typePrefix };
        state.errors = null;
      })
      .addCase(updateFactoryUsage.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateFactoryUsage.typePrefix };
        state.update = true;
      })
      .addCase(updateFactoryUsage.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateFactoryUsage.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteFactoryUsage.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteFactoryUsage.typePrefix };
        state.errors = null;
      })
      .addCase(deleteFactoryUsage.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteFactoryUsage.typePrefix };
        state.update = true;
      })
      .addCase(deleteFactoryUsage.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteFactoryUsage.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = factoryUsageSlice.actions;

export default factoryUsageSlice.reducer;
