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
      return await API.getCategories(filter);
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/create",
  async (data: FormData, thunkAPI) => {
    try {
      return await API.createCategory(data);
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      return await API.updateCategory(id, data).then((response) => {
        return { response, id };
      });
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deleteCategory = createAsyncThunk("category/delete", async (id: number, thunkAPI) => {
  try {
    return await API.deleteCategory(id).then(() => {
      return id;
    });
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});
