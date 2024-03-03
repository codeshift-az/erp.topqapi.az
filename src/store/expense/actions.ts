import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { UpdateArgs } from "@/types/store";
import { ExpenseFilter } from "@/types/filters";

// API
import * as API from "@/api/expense";

export const getExpenses = createAsyncThunk(
  "expense/get",
  async (filter: ExpenseFilter, thunkAPI) => {
    try {
      const response = await API.getExpenses(filter);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const createExpense = createAsyncThunk(
  "expense/create",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await API.createExpense(data);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const updateExpense = createAsyncThunk(
  "expense/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await API.updateExpense(id, data);
      return { response, id };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deleteExpense = createAsyncThunk("expense/delete", async (id: number, thunkAPI) => {
  try {
    await API.deleteExpense(id);
    return id;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});
