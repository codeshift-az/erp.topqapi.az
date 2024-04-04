import axios from "@/api";

// Types
import { OrderExpense } from "@/types/models";

// URLs
import * as URL from "./urls";

export const createOrderExpense = async (formData: FormData): Promise<OrderExpense> => {
  const { data } = await axios.post(URL.ORDER_EXPENSE_LIST_URL, formData);
  return data;
};

export const updateOrderExpense = async (id: number, formData: FormData): Promise<OrderExpense> => {
  const { data } = await axios.patch(URL.ORDER_EXPENSE_DETAIL_URL(id), formData);
  return data;
};

export const deleteOrderExpense = async (id: number): Promise<number> => {
  await axios.delete(URL.ORDER_EXPENSE_DETAIL_URL(id));
  return id;
};
