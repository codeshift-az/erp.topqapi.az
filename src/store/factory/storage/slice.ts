import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { FactoryStorageItem } from "@/types/models";
import { Status } from "@/types/store";

// Actions
import {
  getFactoryStorageItems,
  createFactoryStorageItem,
  updateFactoryStorageItem,
  deleteFactoryStorageItem,
} from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: FactoryStorageItem[] | null;
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

export const factoryStorageItemSlice = createSlice({
  name: "factoryStorageItem",
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
      .addCase(getFactoryStorageItems.pending, (state) => {
        state.status = { ...LOADING, lastAction: getFactoryStorageItems.typePrefix };
        state.errors = null;
      })
      .addCase(getFactoryStorageItems.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getFactoryStorageItems.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getFactoryStorageItems.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getFactoryStorageItems.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createFactoryStorageItem.pending, (state) => {
        state.status = { ...LOADING, lastAction: createFactoryStorageItem.typePrefix };
        state.errors = null;
      })
      .addCase(createFactoryStorageItem.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createFactoryStorageItem.typePrefix };
        state.update = true;
      })
      .addCase(createFactoryStorageItem.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createFactoryStorageItem.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateFactoryStorageItem.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateFactoryStorageItem.typePrefix };
        state.errors = null;
      })
      .addCase(updateFactoryStorageItem.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateFactoryStorageItem.typePrefix };
        state.update = true;
      })
      .addCase(updateFactoryStorageItem.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateFactoryStorageItem.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteFactoryStorageItem.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteFactoryStorageItem.typePrefix };
        state.errors = null;
      })
      .addCase(deleteFactoryStorageItem.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteFactoryStorageItem.typePrefix };
        state.update = true;
      })
      .addCase(deleteFactoryStorageItem.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteFactoryStorageItem.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = factoryStorageItemSlice.actions;

export default factoryStorageItemSlice.reducer;
