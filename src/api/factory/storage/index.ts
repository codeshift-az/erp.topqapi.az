import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import { FactoryStorageItem } from "@/types/models";
import { FactoryStorageItemFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getFactoryStorageItems = async (
  filter: FactoryStorageItemFilter
): Promise<PaginationResult<FactoryStorageItem>> => {
  const { data } = await axios.get(getUrlWithFilter(URL.FACTORY_STORAGE_ITEM_LIST_URL, filter));
  return data;
};
export const createFactoryStorageItem = async (formData: FormData): Promise<FactoryStorageItem> => {
  const { data } = await axios.post(URL.FACTORY_STORAGE_ITEM_LIST_URL, formData);
  return data;
};

export const updateFactoryStorageItem = async (
  id: number,
  formData: FormData
): Promise<FactoryStorageItem> => {
  const { data } = await axios.patch(URL.FACTORY_STORAGE_ITEM_DETAIL_URL(id), formData);
  return data;
};

export const deleteFactoryStorageItem = async (id: number): Promise<number> => {
  await axios.delete(URL.FACTORY_STORAGE_ITEM_DETAIL_URL(id));
  return id;
};
