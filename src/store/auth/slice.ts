import { createSlice } from "@reduxjs/toolkit";

// Constants
import { LOADING, SUCCESS, FAILURE } from "@/constants";

// Actions
import { login, refreshToken, verifyToken, logout } from "./actions";

interface StateProps {
  status: {
    loading: boolean;
    failure: boolean;
    success: boolean;
  };
  errors: any;
  isAuth: boolean;
}

const initialState: StateProps = {
  status: {
    loading: false,
    failure: false,
    success: false,
  },
  errors: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = LOADING;
        state.errors = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.status = SUCCESS;
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = FAILURE;
        state.errors = payload;
      });
    builder
      .addCase(refreshToken.pending, (state) => {
        state.status = LOADING;
        state.errors = null;
        state.isAuth = false;
      })
      .addCase(refreshToken.fulfilled, (state) => {
        state.status = SUCCESS;
        state.isAuth = true;
      })
      .addCase(refreshToken.rejected, (state, { payload }) => {
        state.status = FAILURE;
        state.errors = payload;
      });
    builder
      .addCase(verifyToken.pending, (state) => {
        state.status = LOADING;
        state.errors = null;
        state.isAuth = false;
      })
      .addCase(verifyToken.fulfilled, (state) => {
        state.status = SUCCESS;
        state.isAuth = true;
      })
      .addCase(verifyToken.rejected, (state, { payload }) => {
        state.status = FAILURE;
        state.errors = payload;
      });
    builder.addCase(logout.pending, (state) => {
      state.status = SUCCESS;
      state.errors = null;
      state.isAuth = false;
    });
  },
});

export const { setIsAuth } = authSlice.actions;

export default authSlice.reducer;
