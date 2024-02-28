import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { UpdateArgs } from "@/types/store";
import { SupplierFilter } from "@/types/filters";

// API
import * as API from "@/api/supplier";

export const getSuppliers = createAsyncThunk(
  "supplier/get",
  async (filter: SupplierFilter, thunkAPI) => {
    try {
      const response = await API.getSuppliers(filter);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const createSupplier = createAsyncThunk(
  "supplier/create",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await API.createSupplier(data);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const updateSupplier = createAsyncThunk(
  "supplier/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await API.updateSupplier(id, data);
      return { response, id };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deleteSupplier = createAsyncThunk("supplier/delete", async (id: number, thunkAPI) => {
  try {
    await API.deleteSupplier(id);
    return id;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});
