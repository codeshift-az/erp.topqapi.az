import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { Supplier } from "@/types/models";
import { Status } from "@/types/store";

// Actions
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier } from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: Supplier[] | null;
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

export const supplierSlice = createSlice({
  name: "supplier",
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
      .addCase(getSuppliers.pending, (state) => {
        state.status = { ...LOADING, lastAction: getSuppliers.typePrefix };
        state.errors = null;
      })
      .addCase(getSuppliers.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getSuppliers.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getSuppliers.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getSuppliers.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createSupplier.pending, (state) => {
        state.status = { ...LOADING, lastAction: createSupplier.typePrefix };
        state.errors = null;
      })
      .addCase(createSupplier.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createSupplier.typePrefix };
        state.update = true;
      })
      .addCase(createSupplier.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createSupplier.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateSupplier.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateSupplier.typePrefix };
        state.errors = null;
      })
      .addCase(updateSupplier.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateSupplier.typePrefix };
        state.update = true;
      })
      .addCase(updateSupplier.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateSupplier.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteSupplier.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteSupplier.typePrefix };
        state.errors = null;
      })
      .addCase(deleteSupplier.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteSupplier.typePrefix };
        state.update = true;
      })
      .addCase(deleteSupplier.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteSupplier.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = supplierSlice.actions;

export default supplierSlice.reducer;
