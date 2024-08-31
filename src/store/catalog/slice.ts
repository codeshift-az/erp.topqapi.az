import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { CatalogItem } from "@/types/models";
import { Status } from "@/types/store";

// Actions
import {
  getCatalogItems,
  createCatalogItem,
  updateCatalogItem,
  deleteCatalogItem,
} from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: CatalogItem[] | null;
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

export const sellerSlice = createSlice({
  name: "seller",
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
      .addCase(getCatalogItems.pending, (state) => {
        state.status = { ...LOADING, lastAction: getCatalogItems.typePrefix };
        state.errors = null;
      })
      .addCase(getCatalogItems.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getCatalogItems.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getCatalogItems.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getCatalogItems.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createCatalogItem.pending, (state) => {
        state.status = { ...LOADING, lastAction: createCatalogItem.typePrefix };
        state.errors = null;
      })
      .addCase(createCatalogItem.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createCatalogItem.typePrefix };
        state.update = true;
      })
      .addCase(createCatalogItem.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createCatalogItem.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateCatalogItem.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateCatalogItem.typePrefix };
        state.errors = null;
      })
      .addCase(updateCatalogItem.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateCatalogItem.typePrefix };
        state.update = true;
      })
      .addCase(updateCatalogItem.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateCatalogItem.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteCatalogItem.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteCatalogItem.typePrefix };
        state.errors = null;
      })
      .addCase(deleteCatalogItem.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteCatalogItem.typePrefix };
        state.update = true;
      })
      .addCase(deleteCatalogItem.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteCatalogItem.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = sellerSlice.actions;

export default sellerSlice.reducer;
