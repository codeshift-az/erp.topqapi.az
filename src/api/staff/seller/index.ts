import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import { Seller } from "@/types/models";
import { SellerFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getSellers = async (filter: SellerFilter): Promise<PaginationResult<Seller>> => {
  const { data } = await axios.get(getUrlWithFilter(URL.SELLER_LIST_URL, filter));
  return data;
};
export const createSeller = async (formData: FormData): Promise<Seller> => {
  const { data } = await axios.post(URL.SELLER_LIST_URL, formData);
  return data;
};

export const updateSeller = async (id: number, formData: FormData): Promise<Seller> => {
  const { data } = await axios.patch(URL.SELLER_DETAIL_URL(id), formData);
  return data;
};

export const deleteSeller = async (id: number): Promise<number> => {
  await axios.delete(URL.SELLER_DETAIL_URL(id));
  return id;
};
