import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { Branch } from "@/types/models";
import { Status } from "@/types/store";

// Actions
import {
  getBranch,
  getBranches,
  createBranch,
  updateBranch,
  deleteBranch,
} from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: Branch[] | null;
  count: number;
  item: Branch | null;
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

export const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    resetState: (state) => {
      state.status = { ...initialState.status };
      state.update = initialState.update;
      state.errors = initialState.errors;
      state.items = initialState.items;
      state.count = initialState.count;
      state.item = initialState.item;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBranches.pending, (state) => {
        state.status = { ...LOADING, lastAction: getBranches.typePrefix };
        state.errors = null;
      })
      .addCase(getBranches.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getBranches.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getBranches.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getBranches.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(getBranch.pending, (state) => {
        state.status = { ...LOADING, lastAction: getBranch.typePrefix };
        state.errors = null;
      })
      .addCase(getBranch.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getBranch.typePrefix };
        state.item = payload;
      })
      .addCase(getBranch.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getBranch.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createBranch.pending, (state) => {
        state.status = { ...LOADING, lastAction: createBranch.typePrefix };
        state.errors = null;
      })
      .addCase(createBranch.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createBranch.typePrefix };
        state.update = true;
      })
      .addCase(createBranch.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createBranch.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateBranch.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateBranch.typePrefix };
        state.errors = null;
      })
      .addCase(updateBranch.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateBranch.typePrefix };
        state.update = true;
      })
      .addCase(updateBranch.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateBranch.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteBranch.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteBranch.typePrefix };
        state.errors = null;
      })
      .addCase(deleteBranch.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteBranch.typePrefix };
        state.update = true;
      })
      .addCase(deleteBranch.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteBranch.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = branchSlice.actions;

export default branchSlice.reducer;
