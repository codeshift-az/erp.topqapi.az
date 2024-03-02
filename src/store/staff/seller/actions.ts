import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { UpdateArgs } from "@/types/store";
import { SellerFilter } from "@/types/filters";

// API
import * as API from "@/api/staff/seller";

export const getSellers = createAsyncThunk("seller/get", async (filter: SellerFilter, thunkAPI) => {
  try {
    const response = await API.getSellers(filter);
    return response;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});

export const createSeller = createAsyncThunk("seller/create", async (data: FormData, thunkAPI) => {
  try {
    const response = await API.createSeller(data);
    return response;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});

export const updateSeller = createAsyncThunk(
  "seller/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await API.updateSeller(id, data);
      return { response, id };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deleteSeller = createAsyncThunk("seller/delete", async (id: number, thunkAPI) => {
  try {
    await API.deleteSeller(id);
    return id;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});
