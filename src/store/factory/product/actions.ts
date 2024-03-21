import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { UpdateArgs } from "@/types/store";
import { FactoryProductFilter } from "@/types/filters";

// API
import * as API from "@/api/factory/product";

export const getFactoryProducts = createAsyncThunk(
  "factory/product/get",
  async (filter: FactoryProductFilter, thunkAPI) => {
    try {
      const response = await API.getFactoryProducts(filter);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const createFactoryProduct = createAsyncThunk(
  "factory/product/create",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await API.createFactoryProduct(data);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const updateFactoryProduct = createAsyncThunk(
  "factory/product/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await API.updateFactoryProduct(id, data);
      return { response, id };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deleteFactoryProduct = createAsyncThunk(
  "factory/product/delete",
  async (id: number, thunkAPI) => {
    try {
      await API.deleteFactoryProduct(id);
      return id;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);
