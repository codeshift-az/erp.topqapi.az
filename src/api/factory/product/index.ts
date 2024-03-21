import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import { FactoryProduct } from "@/types/models";
import { FactoryProductFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getFactoryProducts = async (
  filter: FactoryProductFilter
): Promise<PaginationResult<FactoryProduct>> => {
  const { data } = await axios.get(getUrlWithFilter(URL.FACTORY_PRODUCT_LIST_URL, filter));
  return data;
};
export const createFactoryProduct = async (formData: FormData): Promise<FactoryProduct> => {
  const { data } = await axios.post(URL.FACTORY_PRODUCT_LIST_URL, formData);
  return data;
};

export const updateFactoryProduct = async (
  id: number,
  formData: FormData
): Promise<FactoryProduct> => {
  const { data } = await axios.patch(URL.FACTORY_PRODUCT_DETAIL_URL(id), formData);
  return data;
};

export const deleteFactoryProduct = async (id: number): Promise<number> => {
  await axios.delete(URL.FACTORY_PRODUCT_DETAIL_URL(id));
  return id;
};
