import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { Order } from "@/types/models";
import { Status } from "@/types/store";

// Actions
import {
  getOrders,
  getOrderDetails,
  createOrder,
  updateOrder,
  deleteOrder,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
  createOrderExpense,
  updateOrderExpense,
  deleteOrderExpense,
} from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: Order[] | null;
  count: number;
  item: Order | null;
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
  item: null,
};

export const orderSlice = createSlice({
  name: "order",
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
      .addCase(getOrders.pending, (state) => {
        state.status = { ...LOADING, lastAction: getOrders.typePrefix };
        state.errors = null;
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getOrders.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getOrders.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getOrders.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(getOrderDetails.pending, (state) => {
        state.status = { ...LOADING, lastAction: getOrderDetails.typePrefix };
        state.errors = null;
      })
      .addCase(getOrderDetails.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getOrderDetails.typePrefix };
        state.item = payload;
        state.update = false;
      })
      .addCase(getOrderDetails.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getOrderDetails.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createOrderItem.pending, (state) => {
        state.status = { ...LOADING, lastAction: createOrderItem.typePrefix };
        state.errors = null;
      })
      .addCase(createOrderItem.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createOrderItem.typePrefix };
        state.update = true;
      })
      .addCase(createOrderItem.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createOrderItem.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateOrderItem.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateOrderItem.typePrefix };
        state.errors = null;
      })
      .addCase(updateOrderItem.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateOrderItem.typePrefix };
        state.update = true;
      })
      .addCase(updateOrderItem.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateOrderItem.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteOrderItem.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteOrderItem.typePrefix };
        state.errors = null;
      })
      .addCase(deleteOrderItem.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteOrderItem.typePrefix };
        state.update = true;
      })
      .addCase(deleteOrderItem.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteOrderItem.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createOrderExpense.pending, (state) => {
        state.status = { ...LOADING, lastAction: createOrderExpense.typePrefix };
        state.errors = null;
      })
      .addCase(createOrderExpense.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createOrderExpense.typePrefix };
        state.update = true;
      })
      .addCase(createOrderExpense.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createOrderExpense.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateOrderExpense.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateOrderExpense.typePrefix };
        state.errors = null;
      })
      .addCase(updateOrderExpense.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateOrderExpense.typePrefix };
        state.update = true;
      })
      .addCase(updateOrderExpense.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateOrderExpense.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteOrderExpense.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteOrderExpense.typePrefix };
        state.errors = null;
      })
      .addCase(deleteOrderExpense.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteOrderExpense.typePrefix };
        state.update = true;
      })
      .addCase(deleteOrderExpense.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteOrderExpense.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = { ...LOADING, lastAction: createOrder.typePrefix };
        state.errors = null;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createOrder.typePrefix };
        state.update = true;
      })
      .addCase(createOrder.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createOrder.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateOrder.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateOrder.typePrefix };
        state.errors = null;
      })
      .addCase(updateOrder.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateOrder.typePrefix };
        state.update = true;
      })
      .addCase(updateOrder.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateOrder.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteOrder.typePrefix };
        state.errors = null;
      })
      .addCase(deleteOrder.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteOrder.typePrefix };
        state.update = true;
      })
      .addCase(deleteOrder.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteOrder.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = orderSlice.actions;

export default orderSlice.reducer;
