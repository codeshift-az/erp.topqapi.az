import { createAsyncThunk } from "@reduxjs/toolkit";

// API
import * as API from "@/api/account";

export const getAccount = createAsyncThunk("account/get", async (_, thunkAPI) => {
  try {
    const response = await API.getAccount();
    return response;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateAccount = createAsyncThunk(
  "account/update",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await API.updateAccount(data);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
