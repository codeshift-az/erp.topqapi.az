import { createAsyncThunk } from "@reduxjs/toolkit";

// Helpers
import { getFormData } from "@/helpers";
import { removeAuthCookies, setAuthCookies } from "@/helpers/auth";

// API
import * as API from "@/api/auth";

// Actions
import { resetAccount } from "@/store/account/slice";

export const login = createAsyncThunk("auth/login", async (credentials: FormData, thunkAPI) => {
  try {
    const response = await API.postLogin(credentials);
    console.log(credentials.get("remember"));
    setAuthCookies(response, credentials.get("remember") === "true");
  } catch (error: any) {
    throw thunkAPI.rejectWithValue(error.response.data);
  }
});

export const refreshToken = createAsyncThunk(
  "auth/token/refresh",
  async (refreshToken: string, thunkAPI) => {
    try {
      const response = await API.postRefreshToken(getFormData({ refresh: refreshToken }));
      setAuthCookies(response, true);
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const verifyToken = createAsyncThunk(
  "auth/token/verify",
  async (accessToken: string, thunkAPI) => {
    try {
      await API.postVerifyToken(getFormData({ token: accessToken }));
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (refreshToken: string, thunkAPI) => {
  removeAuthCookies();
  thunkAPI.dispatch(resetAccount());

  if (!refreshToken) return;

  await API.postLogout(getFormData({ refresh: refreshToken })).catch((error) => console.log(error));
});
