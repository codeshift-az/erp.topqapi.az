import axios from "@/api";

// Types
import { WarehouseCartItem } from "@/types/models";

// URLs
import * as URL from "./urls";

export const getWarehouseCartItems = async (): Promise<WarehouseCartItem[]> => {
  const { data } = await axios.get(URL.WAREHOUSE_CART_ITEM_LIST_URL);
  return data;
};

export const createWarehouseCartItem = async (formData: FormData): Promise<WarehouseCartItem> => {
  const { data } = await axios.post(URL.WAREHOUSE_CART_ITEM_LIST_URL, formData);
  return data;
};

export const updateWarehouseCartItem = async (
  id: number,
  formData: FormData
): Promise<WarehouseCartItem> => {
  const { data } = await axios.patch(URL.WAREHOUSE_CART_ITEM_DETAIL_URL(id), formData);
  return data;
};

export const deleteWarehouseCartItem = async (id: number): Promise<number> => {
  await axios.delete(URL.WAREHOUSE_CART_ITEM_DETAIL_URL(id));
  return id;
};
