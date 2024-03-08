import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { UpdateArgs } from "@/types/store";

// API
import * as API from "@/api/warehouse/cart";

export const getWarehouseCartItems = createAsyncThunk(
  "warehouse/cart/items/get",
  async (_, thunkAPI) => {
    try {
      const response = await API.getWarehouseCartItems();
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const createWarehouseCartItem = createAsyncThunk(
  "warehouse/cart/items/create",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await API.createWarehouseCartItem(data);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const updateWarehouseCartItem = createAsyncThunk(
  "warehouse/cart/items/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await API.updateWarehouseCartItem(id, data);
      return { response, id };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deleteWarehouseCartItem = createAsyncThunk(
  "warehouse/cart/items/delete",
  async (id: number, thunkAPI) => {
    try {
      await API.deleteWarehouseCartItem(id);
      return id;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);
