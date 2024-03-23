import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import { Payment } from "@/types/models";
import { PaymentFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getPayments = async (filter: PaymentFilter): Promise<PaginationResult<Payment>> => {
  const { data } = await axios.get(getUrlWithFilter(URL.PAYMENT_LIST_URL, filter));
  return data;
};
export const createPayment = async (formData: FormData): Promise<Payment> => {
  const { data } = await axios.post(URL.PAYMENT_LIST_URL, formData);
  return data;
};

export const updatePayment = async (id: number, formData: FormData): Promise<Payment> => {
  const { data } = await axios.patch(URL.PAYMENT_DETAIL_URL(id), formData);
  return data;
};

export const deletePayment = async (id: number): Promise<number> => {
  await axios.delete(URL.PAYMENT_DETAIL_URL(id));
  return id;
};
