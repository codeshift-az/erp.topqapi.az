import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { UpdateArgs } from "@/types/store";

// API
import * as API from "@/api/order/cart";

export const getOrderCartItems = createAsyncThunk("order/cart/items/get", async (_, thunkAPI) => {
  try {
    const response = await API.getOrderCartItems();
    return response;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});

export const createOrderCartItem = createAsyncThunk(
  "order/cart/items/create",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await API.createOrderCartItem(data);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const updateOrderCartItem = createAsyncThunk(
  "order/cart/items/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await API.updateOrderCartItem(id, data);
      return { response, id };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deleteOrderCartItem = createAsyncThunk(
  "order/cart/items/delete",
  async (id: number, thunkAPI) => {
    try {
      await API.deleteOrderCartItem(id);
      return id;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);
