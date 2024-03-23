import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { UpdateArgs } from "@/types/store";
import { PaymentFilter } from "@/types/filters";

// API
import * as API from "@/api/payment";

export const getPayments = createAsyncThunk(
  "payment/get",
  async (filter: PaymentFilter, thunkAPI) => {
    try {
      const response = await API.getPayments(filter);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const createPayment = createAsyncThunk(
  "payment/create",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await API.createPayment(data);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const updatePayment = createAsyncThunk(
  "payment/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await API.updatePayment(id, data);
      return { response, id };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deletePayment = createAsyncThunk("payment/delete", async (id: number, thunkAPI) => {
  try {
    await API.deletePayment(id);
    return id;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});
