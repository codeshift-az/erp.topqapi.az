import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { UpdateArgs } from "@/types/store";
import { ProductRecordFilter } from "@/types/filters";

// API
import * as API from "@/api/catalog";

export const getProductRecords = createAsyncThunk(
  "catalog/get",
  async (filter: ProductRecordFilter, thunkAPI) => {
    try {
      const response = await API.getProductRecords(filter);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const createProductRecord = createAsyncThunk(
  "catalog/create",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await API.createProductRecord(data);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const updateProductRecord = createAsyncThunk(
  "catalog/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await API.updateProductRecord(id, data);
      return { response, id };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deleteProductRecord = createAsyncThunk(
  "catalog/delete",
  async (id: number, thunkAPI) => {
    try {
      await API.deleteProductRecord(id);
      return id;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);
