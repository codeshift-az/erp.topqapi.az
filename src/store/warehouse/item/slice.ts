import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { Status } from "@/types/store";
import { WarehouseItem } from "@/types/models";

// Actions
import { getWarehouseItems } from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: WarehouseItem[] | null;
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

export const warehouseItemSlice = createSlice({
  name: "warehouseItem",
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
      .addCase(getWarehouseItems.pending, (state) => {
        state.status = { ...LOADING, lastAction: getWarehouseItems.typePrefix };
        state.errors = null;
      })
      .addCase(getWarehouseItems.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getWarehouseItems.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getWarehouseItems.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getWarehouseItems.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = warehouseItemSlice.actions;

export default warehouseItemSlice.reducer;
