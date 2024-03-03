import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { Expense } from "@/types/models";
import { Status } from "@/types/store";

// Actions
import { getExpenses, createExpense, updateExpense, deleteExpense } from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: Expense[] | null;
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

export const expenseSlice = createSlice({
  name: "expense",
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
      .addCase(getExpenses.pending, (state) => {
        state.status = { ...LOADING, lastAction: getExpenses.typePrefix };
        state.errors = null;
      })
      .addCase(getExpenses.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getExpenses.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getExpenses.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getExpenses.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createExpense.pending, (state) => {
        state.status = { ...LOADING, lastAction: createExpense.typePrefix };
        state.errors = null;
      })
      .addCase(createExpense.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createExpense.typePrefix };
        state.update = true;
      })
      .addCase(createExpense.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createExpense.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateExpense.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateExpense.typePrefix };
        state.errors = null;
      })
      .addCase(updateExpense.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateExpense.typePrefix };
        state.update = true;
      })
      .addCase(updateExpense.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateExpense.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteExpense.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteExpense.typePrefix };
        state.errors = null;
      })
      .addCase(deleteExpense.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteExpense.typePrefix };
        state.update = true;
      })
      .addCase(deleteExpense.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteExpense.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = expenseSlice.actions;

export default expenseSlice.reducer;
