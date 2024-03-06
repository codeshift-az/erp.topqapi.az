import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Types
import { User } from "@/types/models";

// Actions
import { getAccount } from "./actions";

interface StateProps {
  status: {
    loading: boolean;
    success: boolean;
    failure: boolean;
    lastAction: string | null;
  };
  errors: any;
  user: User | null;
}

const initialState: StateProps = {
  status: {
    loading: false,
    success: false,
    failure: false,
    lastAction: null,
  },
  errors: null,
  user: null,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    resetAccount: (state) => {
      state.status = { ...initialState.status };
      state.errors = initialState.errors;
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccount.pending, (state) => {
        state.status = { ...LOADING, lastAction: getAccount.typePrefix };
        state.errors = null;
        state.user = null;
      })
      .addCase(getAccount.fulfilled, (state, { payload }) => {
        state.status = { ...SUCCESS, lastAction: getAccount.typePrefix };
        state.user = payload;
      })
      .addCase(getAccount.rejected, (state, { payload }) => {
        state.status = { ...FAILURE, lastAction: getAccount.typePrefix };
        state.errors = payload;
      });
  },
});

export const { resetAccount } = accountSlice.actions;

export default accountSlice.reducer;
