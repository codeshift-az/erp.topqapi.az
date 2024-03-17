import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { WarehouseItemFilter } from "@/types/filters";

// API
import * as API from "@/api/warehouse/item";

export const getWarehouseItems = createAsyncThunk(
  "warehouse/item/get",
  async (filter: WarehouseItemFilter, thunkAPI) => {
    try {
      const response = await API.getWarehouseItems(filter);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);
