import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import { Product } from "@/types/models";
import { ProductFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getProducts = async (filter: ProductFilter): Promise<PaginationResult<Product>> => {
  const { data } = await axios.get(getUrlWithFilter(URL.PRODUCT_LIST_URL, filter));
  return data;
};
export const createProduct = async (formData: FormData): Promise<Product> => {
  const { data } = await axios.post(URL.PRODUCT_LIST_URL, formData);
  return data;
};

export const updateProduct = async (id: number, formData: FormData): Promise<Product> => {
  const { data } = await axios.put(URL.PRODUCT_DETAIL_URL(id), formData);
  return data;
};

export const deleteProduct = async (id: number): Promise<number> => {
  await axios.delete(URL.PRODUCT_DETAIL_URL(id));
  return id;
};
