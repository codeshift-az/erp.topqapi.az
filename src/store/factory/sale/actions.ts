import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { UpdateArgs } from "@/types/store";
import { FactorySaleFilter } from "@/types/filters";

// API
import * as API from "@/api/factory/sale";

export const getFactorySales = createAsyncThunk(
  "factory/sale/get",
  async (filter: FactorySaleFilter, thunkAPI) => {
    try {
      const response = await API.getFactorySales(filter);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const createFactorySale = createAsyncThunk(
  "factory/sale/create",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await API.createFactorySale(data);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const updateFactorySale = createAsyncThunk(
  "factory/sale/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await API.updateFactorySale(id, data);
      return { response, id };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deleteFactorySale = createAsyncThunk(
  "factory/sale/delete",
  async (id: number, thunkAPI) => {
    try {
      await API.deleteFactorySale(id);
      return id;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);
