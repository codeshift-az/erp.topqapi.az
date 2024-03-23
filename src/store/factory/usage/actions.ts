import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { UpdateArgs } from "@/types/store";
import { FactoryUsageFilter } from "@/types/filters";

// API
import * as API from "@/api/factory/usage";

export const getFactoryUsages = createAsyncThunk(
  "factory/usage/get",
  async (filter: FactoryUsageFilter, thunkAPI) => {
    try {
      const response = await API.getFactoryUsages(filter);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const createFactoryUsage = createAsyncThunk(
  "factory/usage/create",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await API.createFactoryUsage(data);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const updateFactoryUsage = createAsyncThunk(
  "factory/usage/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await API.updateFactoryUsage(id, data);
      return { response, id };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deleteFactoryUsage = createAsyncThunk(
  "factory/usage/delete",
  async (id: number, thunkAPI) => {
    try {
      await API.deleteFactoryUsage(id);
      return id;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);
