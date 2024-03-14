import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { UpdateArgs } from "@/types/store";
import { OrderFilter } from "@/types/filters";

// API
import * as API from "@/api/order";
import * as OrderItemAPI from "@/api/order/item";

export const getOrders = createAsyncThunk("order/get", async (filter: OrderFilter, thunkAPI) => {
  try {
    const response = await API.getOrders(filter);
    return response;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});

export const getOrderDetails = createAsyncThunk(
  "order/getDetails",
  async (id: number, thunkAPI) => {
    try {
      const response = await API.getOrderDetails(id);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const createOrderItem = createAsyncThunk(
  "order/item/create",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await OrderItemAPI.createOrderItem(data);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const updateOrderItem = createAsyncThunk(
  "order/item/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await OrderItemAPI.updateOrderItem(id, data);
      return { response, id };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deleteOrderItem = createAsyncThunk(
  "order/item/delete",
  async (id: number, thunkAPI) => {
    try {
      await OrderItemAPI.deleteOrderItem(id);
      return id;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const createOrder = createAsyncThunk("order/create", async (data: FormData, thunkAPI) => {
  try {
    const response = await API.createOrder(data);
    return response;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});

export const updateOrder = createAsyncThunk(
  "order/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await API.updateOrder(id, data);
      return { response, id };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deleteOrder = createAsyncThunk("order/delete", async (id: number, thunkAPI) => {
  try {
    await API.deleteOrder(id);
    return id;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});
