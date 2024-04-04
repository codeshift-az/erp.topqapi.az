import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import { OrderItem, OrderItemStats } from "@/types/models";
import { OrderItemFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getOrderItems = async (
  filter: OrderItemFilter
): Promise<PaginationResult<OrderItem>> => {
  const { data } = await axios.get(getUrlWithFilter(URL.ORDER_ITEM_LIST_URL, filter));
  return data;
};

export const getOrderItemStats = async (filter: OrderItemFilter): Promise<OrderItemStats> => {
  const { data } = await axios.get(getUrlWithFilter(URL.ORDER_ITEM_STAT_URL, filter));
  return data;
};

export const createOrderItem = async (formData: FormData): Promise<OrderItem> => {
  const { data } = await axios.post(URL.ORDER_ITEM_LIST_URL, formData);
  return data;
};

export const updateOrderItem = async (id: number, formData: FormData): Promise<OrderItem> => {
  const { data } = await axios.patch(URL.ORDER_ITEM_DETAIL_URL(id), formData);
  return data;
};

export const deleteOrderItem = async (id: number): Promise<number> => {
  await axios.delete(URL.ORDER_ITEM_DETAIL_URL(id));
  return id;
};
