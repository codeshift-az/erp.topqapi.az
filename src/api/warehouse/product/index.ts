import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import { WarehouseProduct } from "@/types/models";
import { WarehouseProductFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getWarehouseProducts = async (
  filter: WarehouseProductFilter
): Promise<PaginationResult<WarehouseProduct>> => {
  const { data } = await axios.get(getUrlWithFilter(URL.WAREHOUSE_PRODUCT_LIST_URL, filter));
  return data;
};

export const createWarehouseProduct = async (formData: FormData): Promise<WarehouseProduct> => {
  const { data } = await axios.post(URL.WAREHOUSE_PRODUCT_LIST_URL, formData);
  return data;
};

export const updateWarehouseProduct = async (
  id: number,
  formData: FormData
): Promise<WarehouseProduct> => {
  const { data } = await axios.patch(URL.WAREHOUSE_PRODUCT_DETAIL_URL(id), formData);
  return data;
};

export const deleteWarehouseProduct = async (id: number): Promise<number> => {
  await axios.delete(URL.WAREHOUSE_PRODUCT_DETAIL_URL(id));
  return id;
};
