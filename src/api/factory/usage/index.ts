import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import { FactoryUsage } from "@/types/models";
import { FactoryUsageFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getFactoryUsages = async (
  filter: FactoryUsageFilter
): Promise<PaginationResult<FactoryUsage>> => {
  const { data } = await axios.get(getUrlWithFilter(URL.FACTORY_USAGE_LIST_URL, filter));
  return data;
};
export const createFactoryUsage = async (formData: FormData): Promise<FactoryUsage> => {
  const { data } = await axios.post(URL.FACTORY_USAGE_LIST_URL, formData);
  return data;
};

export const updateFactoryUsage = async (id: number, formData: FormData): Promise<FactoryUsage> => {
  const { data } = await axios.patch(URL.FACTORY_USAGE_DETAIL_URL(id), formData);
  return data;
};

export const deleteFactoryUsage = async (id: number): Promise<number> => {
  await axios.delete(URL.FACTORY_USAGE_DETAIL_URL(id));
  return id;
};
