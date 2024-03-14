import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import { Order } from "@/types/models";
import { OrderFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getOrders = async (filter: OrderFilter): Promise<PaginationResult<Order>> => {
  const { data } = await axios.get(getUrlWithFilter(URL.ORDER_LIST_URL, filter));
  return data;
};

export const getOrderDetails = async (id: number): Promise<Order> => {
  const { data } = await axios.get(URL.ORDER_DETAIL_URL(id));
  return data;
};

export const createOrder = async (formData: FormData): Promise<Order> => {
  const { data } = await axios.post(URL.ORDER_LIST_URL, formData);
  return data;
};

export const updateOrder = async (id: number, formData: FormData): Promise<Order> => {
  const { data } = await axios.patch(URL.ORDER_DETAIL_URL(id), formData);
  return data;
};

export const deleteOrder = async (id: number): Promise<void> => {
  await axios.delete(URL.ORDER_DETAIL_URL(id));
};
