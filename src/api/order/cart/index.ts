import axios from "@/api";

// Types
import { OrderCartItem } from "@/types/models";

// URLs
import * as URL from "./urls";

export const getOrderCartItems = async (): Promise<OrderCartItem[]> => {
  const { data } = await axios.get(URL.ORDER_CART_ITEM_LIST_URL);
  return data;
};

export const createOrderCartItem = async (formData: FormData): Promise<OrderCartItem> => {
  const { data } = await axios.post(URL.ORDER_CART_ITEM_LIST_URL, formData);
  return data;
};

export const updateOrderCartItem = async (
  id: number,
  formData: FormData
): Promise<OrderCartItem> => {
  const { data } = await axios.patch(URL.ORDER_CART_ITEM_DETAIL_URL(id), formData);
  return data;
};

export const deleteOrderCartItem = async (id: number): Promise<number> => {
  await axios.delete(URL.ORDER_CART_ITEM_DETAIL_URL(id));
  return id;
};
