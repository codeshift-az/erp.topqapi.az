import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { Status } from "@/types/store";
import { OrderCartItem } from "@/types/models";

// Actions
import {
  getOrderCartItems,
  createOrderCartItem,
  updateOrderCartItem,
  deleteOrderCartItem,
} from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: OrderCartItem[] | null;
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
      .addCase(getOrderCartItems.pending, (state) => {
        state.status = { ...LOADING, lastAction: getOrderCartItems.typePrefix };
        state.errors = null;
      })
      .addCase(getOrderCartItems.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getOrderCartItems.typePrefix };
        state.items = payload;
        state.update = false;
      })
      .addCase(getOrderCartItems.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getOrderCartItems.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createOrderCartItem.pending, (state) => {
        state.status = { ...LOADING, lastAction: createOrderCartItem.typePrefix };
        state.errors = null;
      })
      .addCase(createOrderCartItem.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createOrderCartItem.typePrefix };
        state.update = true;
      })
      .addCase(createOrderCartItem.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createOrderCartItem.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateOrderCartItem.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateOrderCartItem.typePrefix };
        state.errors = null;
      })
      .addCase(updateOrderCartItem.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateOrderCartItem.typePrefix };
        state.update = true;
      })
      .addCase(updateOrderCartItem.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateOrderCartItem.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteOrderCartItem.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteOrderCartItem.typePrefix };
        state.errors = null;
      })
      .addCase(deleteOrderCartItem.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteOrderCartItem.typePrefix };
        state.update = true;
      })
      .addCase(deleteOrderCartItem.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteOrderCartItem.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = warehouseCartSlice.actions;

export default warehouseCartSlice.reducer;
