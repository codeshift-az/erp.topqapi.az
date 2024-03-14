import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { Status } from "@/types/store";
import { OrderItem } from "@/types/models";

// Actions
import { getOrderItems } from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: OrderItem[] | null;
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
  },
});

export const { resetState } = orderItemSlice.actions;

export default orderItemSlice.reducer;
