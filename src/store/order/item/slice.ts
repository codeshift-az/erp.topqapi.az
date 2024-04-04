import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { Status } from "@/types/store";
import { OrderItem, OrderItemStats } from "@/types/models";

// Actions
import { getOrderItems, getOrderItemStats } from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: OrderItem[] | null;
  count: number;
  stats: OrderItemStats | null;
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
  stats: null,
};

export const orderItemSlice = createSlice({
  name: "orderItem",
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
      .addCase(getOrderItems.pending, (state) => {
        state.status = { ...LOADING, lastAction: getOrderItems.typePrefix };
        state.errors = null;
      })
      .addCase(getOrderItems.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getOrderItems.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getOrderItems.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getOrderItems.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(getOrderItemStats.pending, (state) => {
        state.status = { ...LOADING, lastAction: getOrderItemStats.typePrefix };
        state.errors = null;
      })
      .addCase(getOrderItemStats.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getOrderItemStats.typePrefix };
        state.stats = payload;
      })
      .addCase(getOrderItemStats.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getOrderItemStats.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = orderItemSlice.actions;

export default orderItemSlice.reducer;
