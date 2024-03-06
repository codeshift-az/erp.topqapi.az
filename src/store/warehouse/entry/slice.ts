import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { WarehouseEntry } from "@/types/models";
import { Status } from "@/types/store";

// Actions
import { getWarehouseEntries } from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: WarehouseEntry[] | null;
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

export const warehouseEntrySlice = createSlice({
  name: "warehouseEntry",
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
      .addCase(getWarehouseEntries.pending, (state) => {
        state.status = { ...LOADING, lastAction: getWarehouseEntries.typePrefix };
        state.errors = null;
      })
      .addCase(getWarehouseEntries.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getWarehouseEntries.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getWarehouseEntries.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getWarehouseEntries.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = warehouseEntrySlice.actions;

export default warehouseEntrySlice.reducer;
