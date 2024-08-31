import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { UpdateArgs } from "@/types/store";
import { CatalogItemFilter } from "@/types/filters";

// API
import * as API from "@/api/catalog";

export const getCatalogItems = createAsyncThunk(
  "catalog/items/get",
  async (filter: CatalogItemFilter, thunkAPI) => {
    try {
      const response = await API.getCatalogItems(filter);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({
        data: error.response.data,
        status: error.response.status,
      });
    }
  }
);

export const createCatalogItem = createAsyncThunk(
  "catalog/items/create",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await API.createCatalogItem(data);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({
        data: error.response.data,
        status: error.response.status,
      });
    }
  }
);

export const updateCatalogItem = createAsyncThunk(
  "catalog/items/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await API.updateCatalogItem(id, data);
      return { response, id };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({
        data: error.response.data,
        status: error.response.status,
      });
    }
  }
);

export const deleteCatalogItem = createAsyncThunk(
  "catalog/items/delete",
  async (id: number, thunkAPI) => {
    try {
      await API.deleteCatalogItem(id);
      return id;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({
        data: error.response.data,
        status: error.response.status,
      });
    }
  }
);
