import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { WarehouseProductFilter } from "@/types/filters";

// API
import * as API from "@/api/order/item";

export const getOrderItems = createAsyncThunk(
  "order/item/get",
  async (filter: WarehouseProductFilter, thunkAPI) => {
    try {
      const response = await API.getOrderItems(filter);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);
