import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import { WarehouseEntry } from "@/types/models";
import { WarehouseEntryFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getWarehouseEntries = async (
  filter: WarehouseEntryFilter
): Promise<PaginationResult<WarehouseEntry>> => {
  const { data } = await axios.get(getUrlWithFilter(URL.WAREHOUSE_ENTRY_LIST_URL, filter));
  return data;
};

export const getWarehouseEntryDetails = async (id: number): Promise<WarehouseEntry> => {
  const { data } = await axios.get(URL.WAREHOUSE_ENTRY_DETAIL_URL(id));
  return data;
};

export const createWarehouseEntry = async (formData: FormData): Promise<WarehouseEntry> => {
  const { data } = await axios.post(URL.WAREHOUSE_ENTRY_LIST_URL, formData);
  return data;
};

export const updateWarehouseEntry = async (
  id: number,
  formData: FormData
): Promise<WarehouseEntry> => {
  const { data } = await axios.patch(URL.WAREHOUSE_ENTRY_DETAIL_URL(id), formData);
  return data;
};

export const deleteWarehouseEntry = async (id: number): Promise<void> => {
  await axios.delete(URL.WAREHOUSE_ENTRY_DETAIL_URL(id));
};
