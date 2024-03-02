import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { UpdateArgs } from "@/types/store";
import { WorkerFilter } from "@/types/filters";

// API
import * as API from "@/api/staff/worker";

export const getWorkers = createAsyncThunk("worker/get", async (filter: WorkerFilter, thunkAPI) => {
  try {
    const response = await API.getWorkers(filter);
    return response;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});

export const createWorker = createAsyncThunk("worker/create", async (data: FormData, thunkAPI) => {
  try {
    const response = await API.createWorker(data);
    return response;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});

export const updateWorker = createAsyncThunk(
  "worker/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await API.updateWorker(id, data);
      return { response, id };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deleteWorker = createAsyncThunk("worker/delete", async (id: number, thunkAPI) => {
  try {
    await API.deleteWorker(id);
    return id;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});
