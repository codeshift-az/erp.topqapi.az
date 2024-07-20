import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import {
  WarehouseItem,
  WarehouseItemAllStats,
  WarehouseItemStats,
} from "@/types/models";
import { WarehouseItemFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getWarehouseItems = async (
  filter: WarehouseItemFilter
): Promise<PaginationResult<WarehouseItem>> => {
  const { data } = await axios.get(
    getUrlWithFilter(URL.WAREHOUSE_ITEM_LIST_URL, filter)
  );
  return data;
};

export const createWarehouseItem = async (
  formData: FormData
): Promise<WarehouseItem> => {
  const { data } = await axios.post(URL.WAREHOUSE_ITEM_LIST_URL, formData);
  return data;
};

export const updateWarehouseItem = async (
  id: number,
  formData: FormData
): Promise<WarehouseItem> => {
  const { data } = await axios.patch(
    URL.WAREHOUSE_ITEM_DETAIL_URL(id),
    formData
  );
  return data;
};

export const deleteWarehouseItem = async (id: number): Promise<number> => {
  await axios.delete(URL.WAREHOUSE_ITEM_DETAIL_URL(id));
  return id;
};

export const getWarehouseItemStats = async (
  filter: WarehouseItemFilter
): Promise<PaginationResult<WarehouseItemStats>> => {
  const { data } = await axios.get(
    getUrlWithFilter(URL.WAREHOUSE_ITEM_STATS_LIST_URL, filter)
  );
  return data;
};

export const getWarehouseItemAllStats = async (
  filter: WarehouseItemFilter
): Promise<WarehouseItemAllStats> => {
  const { data } = await axios.get(
    getUrlWithFilter(URL.WAREHOUSE_ITEM_ALL_STATS_LIST_URL, filter)
  );
  return data;
};
