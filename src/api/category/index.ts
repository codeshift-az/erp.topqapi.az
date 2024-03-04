import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import { Category } from "@/types/models";
import { CategoryFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getCategories = async (
  filter: CategoryFilter
): Promise<PaginationResult<Category>> => {
  const { data } = await axios.get(getUrlWithFilter(URL.CATEGORY_LIST_URL, filter));
  return data;
};
export const createCategory = async (formData: FormData): Promise<Category> => {
  const { data } = await axios.post(URL.CATEGORY_LIST_URL, formData);
  return data;
};

export const updateCategory = async (id: number, formData: FormData): Promise<Category> => {
  const { data } = await axios.patch(URL.CATEGORY_DETAIL_URL(id), formData);
  return data;
};

export const deleteCategory = async (id: number): Promise<number> => {
  await axios.delete(URL.CATEGORY_DETAIL_URL(id));
  return id;
};
