import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import { FactorySale } from "@/types/models";
import { FactorySaleFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getFactorySales = async (
  filter: FactorySaleFilter
): Promise<PaginationResult<FactorySale>> => {
  const { data } = await axios.get(getUrlWithFilter(URL.FACTORY_SALE_LIST_URL, filter));
  return data;
};
export const createFactorySale = async (formData: FormData): Promise<FactorySale> => {
  const { data } = await axios.post(URL.FACTORY_SALE_LIST_URL, formData);
  return data;
};

export const updateFactorySale = async (id: number, formData: FormData): Promise<FactorySale> => {
  const { data } = await axios.patch(URL.FACTORY_SALE_DETAIL_URL(id), formData);
  return data;
};

export const deleteFactorySale = async (id: number): Promise<number> => {
  await axios.delete(URL.FACTORY_SALE_DETAIL_URL(id));
  return id;
};
