import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { Status } from "@/types/store";
import { WarehouseProduct } from "@/types/models";

// Actions
import { getWarehouseProducts } from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: WarehouseProduct[] | null;
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

export const warehouseProductSlice = createSlice({
  name: "warehouseProduct",
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
      .addCase(getWarehouseProducts.pending, (state) => {
        state.status = { ...LOADING, lastAction: getWarehouseProducts.typePrefix };
        state.errors = null;
      })
      .addCase(getWarehouseProducts.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getWarehouseProducts.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getWarehouseProducts.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getWarehouseProducts.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = warehouseProductSlice.actions;

export default warehouseProductSlice.reducer;
