import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import { Driver } from "@/types/models";
import { DriverFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getDrivers = async (filter: DriverFilter): Promise<PaginationResult<Driver>> => {
  const { data } = await axios.get(getUrlWithFilter(URL.DRIVER_LIST_URL, filter));
  return data;
};
export const createDriver = async (formData: FormData): Promise<Driver> => {
  const { data } = await axios.post(URL.DRIVER_LIST_URL, formData);
  return data;
};

export const updateDriver = async (id: number, formData: FormData): Promise<Driver> => {
  const { data } = await axios.patch(URL.DRIVER_DETAIL_URL(id), formData);
  return data;
};

export const deleteDriver = async (id: number): Promise<number> => {
  await axios.delete(URL.DRIVER_DETAIL_URL(id));
  return id;
};
