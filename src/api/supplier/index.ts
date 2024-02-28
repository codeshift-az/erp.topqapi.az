import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import { Supplier } from "@/types";
import { SupplierFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getSuppliers = async (filter: SupplierFilter): Promise<PaginationResult<Supplier>> => {
  const { data } = await axios.get(getUrlWithFilter(URL.SUPPLIER_LIST_URL, filter));
  return data;
};
export const createSupplier = async (formData: FormData): Promise<Supplier> => {
  const { data } = await axios.post(URL.SUPPLIER_LIST_URL, formData);
  return data;
};

export const updateSupplier = async (id: number, formData: FormData): Promise<Supplier> => {
  const { data } = await axios.put(URL.SUPPLIER_DETAIL_URL(id), formData);
  return data;
};

export const deleteSupplier = async (id: number): Promise<number> => {
  await axios.delete(URL.SUPPLIER_DETAIL_URL(id));
  return id;
};
