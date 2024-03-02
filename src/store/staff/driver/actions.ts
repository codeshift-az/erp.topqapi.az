import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { UpdateArgs } from "@/types/store";
import { DriverFilter } from "@/types/filters";

// API
import * as API from "@/api/staff/driver";

export const getDrivers = createAsyncThunk("driver/get", async (filter: DriverFilter, thunkAPI) => {
  try {
    const response = await API.getDrivers(filter);
    return response;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});

export const createDriver = createAsyncThunk("driver/create", async (data: FormData, thunkAPI) => {
  try {
    const response = await API.createDriver(data);
    return response;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});

export const updateDriver = createAsyncThunk(
  "driver/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await API.updateDriver(id, data);
      return { response, id };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deleteDriver = createAsyncThunk("driver/delete", async (id: number, thunkAPI) => {
  try {
    await API.deleteDriver(id);
    return id;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});
