import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { WarehouseProductFilter } from "@/types/filters";

// API
import * as API from "@/api/warehouse/product";

export const getWarehouseProducts = createAsyncThunk(
  "warehouse/product/get",
  async (filter: WarehouseProductFilter, thunkAPI) => {
    try {
      const response = await API.getWarehouseProducts(filter);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);
