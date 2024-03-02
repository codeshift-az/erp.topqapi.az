import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { Worker } from "@/types/models";
import { Status } from "@/types/store";

// Actions
import { getWorkers, createWorker, updateWorker, deleteWorker } from "./actions";

interface StateProps {
  status: Status;
  errors: any;
  update: boolean;
  items: Worker[] | null;
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

export const workerSlice = createSlice({
  name: "worker",
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
      .addCase(getWorkers.pending, (state) => {
        state.status = { ...LOADING, lastAction: getWorkers.typePrefix };
        state.errors = null;
      })
      .addCase(getWorkers.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getWorkers.typePrefix };
        state.items = payload.results;
        state.count = payload.count;
        state.update = false;
      })
      .addCase(getWorkers.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getWorkers.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(createWorker.pending, (state) => {
        state.status = { ...LOADING, lastAction: createWorker.typePrefix };
        state.errors = null;
      })
      .addCase(createWorker.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: createWorker.typePrefix };
        state.update = true;
      })
      .addCase(createWorker.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: createWorker.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(updateWorker.pending, (state) => {
        state.status = { ...LOADING, lastAction: updateWorker.typePrefix };
        state.errors = null;
      })
      .addCase(updateWorker.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: updateWorker.typePrefix };
        state.update = true;
      })
      .addCase(updateWorker.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: updateWorker.typePrefix };
        state.errors = payload;
      });
    builder
      .addCase(deleteWorker.pending, (state) => {
        state.status = { ...LOADING, lastAction: deleteWorker.typePrefix };
        state.errors = null;
      })
      .addCase(deleteWorker.fulfilled, (state) => {
        state.status = { ...SUCCESS, lastAction: deleteWorker.typePrefix };
        state.update = true;
      })
      .addCase(deleteWorker.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: deleteWorker.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetState } = workerSlice.actions;

export default workerSlice.reducer;
