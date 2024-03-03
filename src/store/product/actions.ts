import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { UpdateArgs } from "@/types/store";
import { ProductFilter } from "@/types/filters";

// API
import * as API from "@/api/product";

export const getProducts = createAsyncThunk(
  "product/get",
  async (filter: ProductFilter, thunkAPI) => {
    try {
      const response = await API.getProducts(filter);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/create",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await API.createProduct(data);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await API.updateProduct(id, data);
      return { response, id };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deleteProduct = createAsyncThunk("product/delete", async (id: number, thunkAPI) => {
  try {
    await API.deleteProduct(id);
    return id;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});
