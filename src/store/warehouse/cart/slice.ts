import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { Status } from "@/types/store";
import { WarehouseCartItem } from "@/types/models";

// Actions
import {
  getWarehouseCartItems,
  createWarehouseCartItem,
  updateWarehouseCartItem,
  deleteWarehouseCartItem,
} from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: WarehouseCartItem[] | null;
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
};

export const warehouseCartSlice = createSlice({
  name: "warehouseCart",
  initialState,
  reducers: {
    resetState: (state) => {
      state.status = { ...initialState.status };
      state.update = initialState.update;
      state.errors = initialState.errors;
      state.items = initialState.items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWarehouseCartItems.pending, (state) => {
        state.status = { ...LOADING, lastAction: getWarehouseCartItems.typePrefix };
        state.errors = null;
      })
      .addCase(getWarehouseCartItems.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getWarehouseCartItems.typePrefix };
        state.items = payload;
        state.update = false;
      })
      .addCase(getWarehouseCartItems.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getWarehouseCartItems.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createWarehouseCartItem.pending, (state) => {
        state.status = { ...LOADING, lastAction: createWarehouseCartItem.typePrefix };
        state.errors = null;
      })
      .addCase(createWarehouseCartItem.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createWarehouseCartItem.typePrefix };
        state.update = true;
      })
      .addCase(createWarehouseCartItem.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createWarehouseCartItem.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateWarehouseCartItem.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateWarehouseCartItem.typePrefix };
        state.errors = null;
      })
      .addCase(updateWarehouseCartItem.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateWarehouseCartItem.typePrefix };
        state.update = true;
      })
      .addCase(updateWarehouseCartItem.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateWarehouseCartItem.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteWarehouseCartItem.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteWarehouseCartItem.typePrefix };
        state.errors = null;
      })
      .addCase(deleteWarehouseCartItem.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteWarehouseCartItem.typePrefix };
        state.update = true;
      })
      .addCase(deleteWarehouseCartItem.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteWarehouseCartItem.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = warehouseCartSlice.actions;

export default warehouseCartSlice.reducer;
