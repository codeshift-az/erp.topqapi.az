import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { UpdateArgs } from "@/types/store";
import { BranchFilter } from "@/types/filters";

// API
import * as API from "@/api/branch";

export const getBranches = createAsyncThunk(
  "branch/get",
  async (filter: BranchFilter, thunkAPI) => {
    try {
      const response = await API.getBranches(filter);
      return response;
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const createBranch = createAsyncThunk("branch/create", async (data: FormData, thunkAPI) => {
  try {
    const response = await API.createBranch(data);
    return response;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});

export const updateBranch = createAsyncThunk(
  "branch/update",
  async ({ id, data }: UpdateArgs, thunkAPI) => {
    try {
      const response = await API.updateBranch(id, data);
      return { response, id };
    } catch (error: any) {
      throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
    }
  }
);

export const deleteBranch = createAsyncThunk("branch/delete", async (id: number, thunkAPI) => {
  try {
    await API.deleteBranch(id);
    return id;
  } catch (error: any) {
    throw thunkAPI.rejectWithValue({ data: error.response.data, status: error.response.status });
  }
});
