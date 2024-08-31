import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import { CatalogItem } from "@/types/models";
import { CatalogItemFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getCatalogItems = async (
  filter: CatalogItemFilter
): Promise<PaginationResult<CatalogItem>> => {
  const { data } = await axios.get(
    getUrlWithFilter(URL.CATALOG_ITEM_LIST_URL, filter)
  );
  return data;
};
export const createCatalogItem = async (
  formData: FormData
): Promise<CatalogItem> => {
  const { data } = await axios.post(URL.CATALOG_ITEM_LIST_URL, formData);
  return data;
};

export const updateCatalogItem = async (
  id: number,
  formData: FormData
): Promise<CatalogItem> => {
  const { data } = await axios.patch(URL.CATALOG_ITEM_DETAIL_URL(id), formData);
  return data;
};

export const deleteCatalogItem = async (id: number): Promise<number> => {
  await axios.delete(URL.CATALOG_ITEM_DETAIL_URL(id));
  return id;
};
