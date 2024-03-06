import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { WarehouseEntryFilter } from "@/types/filters";

// API
import * as API from "@/api/warehouse/entry";

export const getWarehouseEntries = createAsyncThunk(
  "warehouse/entry/get",
  async (filter: WarehouseEntryFilter, thunkAPI) => {
    try {
      const response = await API.getWarehouseEntries(filter);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);
