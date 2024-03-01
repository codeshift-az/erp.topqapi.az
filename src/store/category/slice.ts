import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { Category } from "@/types";
import { Status } from "@/types/store";

// Actions
import { getCategories, createCategory, updateCategory, deleteCategory } from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: Category[] | null;
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

export const categorySlice = createSlice({
  name: "category",
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
      .addCase(getCategories.pending, (state) => {
        state.status = { ...LOADING, lastAction: getCategories.typePrefix };
        state.errors = null;
      })
      .addCase(getCategories.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getCategories.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getCategories.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getCategories.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createCategory.pending, (state) => {
        state.status = { ...LOADING, lastAction: createCategory.typePrefix };
        state.errors = null;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createCategory.typePrefix };
        state.update = true;
      })
      .addCase(createCategory.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createCategory.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateCategory.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateCategory.typePrefix };
        state.errors = null;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateCategory.typePrefix };
        state.update = true;
      })
      .addCase(updateCategory.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateCategory.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteCategory.typePrefix };
        state.errors = null;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteCategory.typePrefix };
        state.update = true;
      })
      .addCase(deleteCategory.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteCategory.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = categorySlice.actions;

export default categorySlice.reducer;
