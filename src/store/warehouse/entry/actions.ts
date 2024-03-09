import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { UpdateArgs } from "@/types/store";
import { WarehouseEntryFilter } from "@/types/filters";

// API
import * as API from "@/api/warehouse/entry";
import * as ProductAPI from "@/api/warehouse/product";

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

export const getWarehouseEntryDetails = createAsyncThunk(
  "warehouse/entry/getDetails",
  async (id: number, thunkAPI) => {
    try {
      const response = await API.getWarehouseEntryDetails(id);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const createWarehouseEntryProduct = createAsyncThunk(
  "warehouse/entry/product/create",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await ProductAPI.createWarehouseProduct(data);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const updateWarehouseEntryProduct = createAsyncThunk(
  "warehouse/entry/product/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await ProductAPI.updateWarehouseProduct(id, data);
      return { response, id };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deleteWarehouseEntryProduct = createAsyncThunk(
  "warehouse/entry/product/delete",
  async (id: number, thunkAPI) => {
    try {
      await ProductAPI.deleteWarehouseProduct(id);
      return id;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);


export const createWarehouseEntry = createAsyncThunk(
  "warehouse/entry/create",
  async (data: FormData, thunkAPI) => {
    try {
      const response = await API.createWarehouseEntry(data);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const updateWarehouseEntry = createAsyncThunk(
  "warehouse/entry/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await API.updateWarehouseEntry(id, data);
      return { response, id };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deleteWarehouseEntry = createAsyncThunk(
  "warehouse/entry/delete",
  async (id: number, thunkAPI) => {
    try {
      await API.deleteWarehouseEntry(id);
      return id;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);