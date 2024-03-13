import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import { ProductRecord } from "@/types/models";
import { ProductRecordFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getProductRecords = async (
  filter: ProductRecordFilter
): Promise<PaginationResult<ProductRecord>> => {
  const { data } = await axios.get(getUrlWithFilter(URL.CATALOG_PRODUCT_LIST_URL, filter));
  return data;
};
export const createProductRecord = async (formData: FormData): Promise<ProductRecord> => {
  const { data } = await axios.post(URL.CATALOG_PRODUCT_LIST_URL, formData);
  return data;
};

export const updateProductRecord = async (
  id: number,
  formData: FormData
): Promise<ProductRecord> => {
  const { data } = await axios.patch(URL.CATALOG_PRODUCT_DETAIL_URL(id), formData);
  return data;
};

export const deleteProductRecord = async (id: number): Promise<number> => {
  await axios.delete(URL.CATALOG_PRODUCT_DETAIL_URL(id));
  return id;
};
