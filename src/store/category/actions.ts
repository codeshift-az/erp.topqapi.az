import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { UpdateArgs } from "@/types/store";
import { CategoryFilter } from "@/types/filters";

// API
import * as API from "@/api/category";

export const getCategories = createAsyncThunk(
  "category/get",
  async (filter: CategoryFilter, thunkAPI) => {
    try {
      const response = await API.getCategories(filter);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/create",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await API.createCategory(data);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await API.updateCategory(id, data);
      return { response, id };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deleteCategory = createAsyncThunk("category/delete", async (id: number, thunkAPI) => {
  try {
    await API.deleteCategory(id);
    return id;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});
