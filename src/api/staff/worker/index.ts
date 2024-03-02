import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import { Worker } from "@/types/models";
import { WorkerFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getWorkers = async (filter: WorkerFilter): Promise<PaginationResult<Worker>> => {
  const { data } = await axios.get(getUrlWithFilter(URL.WORKER_LIST_URL, filter));
  return data;
};
export const createWorker = async (formData: FormData): Promise<Worker> => {
  const { data } = await axios.post(URL.WORKER_LIST_URL, formData);
  return data;
};

export const updateWorker = async (id: number, formData: FormData): Promise<Worker> => {
  const { data } = await axios.put(URL.WORKER_DETAIL_URL(id), formData);
  return data;
};

export const deleteWorker = async (id: number): Promise<number> => {
  await axios.delete(URL.WORKER_DETAIL_URL(id));
  return id;
};
