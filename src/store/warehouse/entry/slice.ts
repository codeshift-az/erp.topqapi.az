import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { WarehouseEntry } from "@/types/models";
import { Status } from "@/types/store";

// Actions
import {
  getWarehouseEntries,
  getWarehouseEntryDetails,
  createWarehouseEntry,
  updateWarehouseEntry,
  deleteWarehouseEntry,
  createWarehouseEntryItem,
  updateWarehouseEntryItem,
  deleteWarehouseEntryItem,
} from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: WarehouseEntry[] | null;
  count: number;
  item: WarehouseEntry | null;
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

export const warehouseEntrySlice = createSlice({
  name: "warehouseEntry",
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
      .addCase(getWarehouseEntries.pending, (state) => {
        state.status = { ...LOADING, lastAction: getWarehouseEntries.typePrefix };
        state.errors = null;
      })
      .addCase(getWarehouseEntries.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getWarehouseEntries.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getWarehouseEntries.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getWarehouseEntries.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(getWarehouseEntryDetails.pending, (state) => {
        state.status = { ...LOADING, lastAction: getWarehouseEntryDetails.typePrefix };
        state.errors = null;
      })
      .addCase(getWarehouseEntryDetails.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getWarehouseEntryDetails.typePrefix };
        state.item = payload;
        state.update = false;
      })
      .addCase(getWarehouseEntryDetails.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getWarehouseEntryDetails.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createWarehouseEntryItem.pending, (state) => {
        state.status = { ...LOADING, lastAction: createWarehouseEntryItem.typePrefix };
        state.errors = null;
      })
      .addCase(createWarehouseEntryItem.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createWarehouseEntryItem.typePrefix };
        state.update = true;
      })
      .addCase(createWarehouseEntryItem.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createWarehouseEntryItem.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateWarehouseEntryItem.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateWarehouseEntryItem.typePrefix };
        state.errors = null;
      })
      .addCase(updateWarehouseEntryItem.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateWarehouseEntryItem.typePrefix };
        state.update = true;
      })
      .addCase(updateWarehouseEntryItem.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateWarehouseEntryItem.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteWarehouseEntryItem.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteWarehouseEntryItem.typePrefix };
        state.errors = null;
      })
      .addCase(deleteWarehouseEntryItem.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteWarehouseEntryItem.typePrefix };
        state.update = true;
      })
      .addCase(deleteWarehouseEntryItem.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteWarehouseEntryItem.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createWarehouseEntry.pending, (state) => {
        state.status = { ...LOADING, lastAction: createWarehouseEntry.typePrefix };
        state.errors = null;
      })
      .addCase(createWarehouseEntry.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createWarehouseEntry.typePrefix };
        state.update = true;
      })
      .addCase(createWarehouseEntry.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createWarehouseEntry.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateWarehouseEntry.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateWarehouseEntry.typePrefix };
        state.errors = null;
      })
      .addCase(updateWarehouseEntry.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateWarehouseEntry.typePrefix };
        state.update = true;
      })
      .addCase(updateWarehouseEntry.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateWarehouseEntry.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteWarehouseEntry.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteWarehouseEntry.typePrefix };
        state.errors = null;
      })
      .addCase(deleteWarehouseEntry.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteWarehouseEntry.typePrefix };
        state.update = true;
      })
      .addCase(deleteWarehouseEntry.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteWarehouseEntry.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = warehouseEntrySlice.actions;

export default warehouseEntrySlice.reducer;
