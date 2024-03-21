import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { UpdateArgs } from "@/types/store";
import { FactoryStorageItemFilter } from "@/types/filters";

// API
import * as API from "@/api/factory/storage";

export const getFactoryStorageItems = createAsyncThunk(
  "factory/storage/get",
  async (filter: FactoryStorageItemFilter, thunkAPI) => {
    try {
      const response = await API.getFactoryStorageItems(filter);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const createFactoryStorageItem = createAsyncThunk(
  "factory/storage/create",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await API.createFactoryStorageItem(data);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const updateFactoryStorageItem = createAsyncThunk(
  "factory/storage/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await API.updateFactoryStorageItem(id, data);
      return { response, id };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deleteFactoryStorageItem = createAsyncThunk(
  "factory/storage/delete",
  async (id: number, thunkAPI) => {
    try {
      await API.deleteFactoryStorageItem(id);
      return id;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);
