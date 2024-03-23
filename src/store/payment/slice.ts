import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { Payment } from "@/types/models";
import { Status } from "@/types/store";

// Actions
import { getPayments, createPayment, updatePayment, deletePayment } from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: Payment[] | null;
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

export const paymentSlice = createSlice({
  name: "payment",
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
      .addCase(getPayments.pending, (state) => {
        state.status = { ...LOADING, lastAction: getPayments.typePrefix };
        state.errors = null;
      })
      .addCase(getPayments.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getPayments.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getPayments.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getPayments.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createPayment.pending, (state) => {
        state.status = { ...LOADING, lastAction: createPayment.typePrefix };
        state.errors = null;
      })
      .addCase(createPayment.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createPayment.typePrefix };
        state.update = true;
      })
      .addCase(createPayment.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createPayment.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updatePayment.pending, (state) => {
        state.status = { ...LOADING, lastAction: updatePayment.typePrefix };
        state.errors = null;
      })
      .addCase(updatePayment.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updatePayment.typePrefix };
        state.update = true;
      })
      .addCase(updatePayment.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updatePayment.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deletePayment.pending, (state) => {
        state.status = { ...LOADING, lastAction: deletePayment.typePrefix };
        state.errors = null;
      })
      .addCase(deletePayment.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deletePayment.typePrefix };
        state.update = true;
      })
      .addCase(deletePayment.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deletePayment.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = paymentSlice.actions;

export default paymentSlice.reducer;
