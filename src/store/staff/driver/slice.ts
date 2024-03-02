import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { Driver } from "@/types/models";
import { Status } from "@/types/store";

// Actions
import { getDrivers, createDriver, updateDriver, deleteDriver } from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: Driver[] | null;
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

export const driverSlice = createSlice({
  name: "driver",
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
      .addCase(getDrivers.pending, (state) => {
        state.status = { ...LOADING, lastAction: getDrivers.typePrefix };
        state.errors = null;
      })
      .addCase(getDrivers.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getDrivers.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getDrivers.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getDrivers.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createDriver.pending, (state) => {
        state.status = { ...LOADING, lastAction: createDriver.typePrefix };
        state.errors = null;
      })
      .addCase(createDriver.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createDriver.typePrefix };
        state.update = true;
      })
      .addCase(createDriver.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createDriver.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateDriver.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateDriver.typePrefix };
        state.errors = null;
      })
      .addCase(updateDriver.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateDriver.typePrefix };
        state.update = true;
      })
      .addCase(updateDriver.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateDriver.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteDriver.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteDriver.typePrefix };
        state.errors = null;
      })
      .addCase(deleteDriver.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteDriver.typePrefix };
        state.update = true;
      })
      .addCase(deleteDriver.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteDriver.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = driverSlice.actions;

export default driverSlice.reducer;
