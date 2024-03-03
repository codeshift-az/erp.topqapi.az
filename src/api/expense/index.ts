import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import { Expense } from "@/types/models";
import { ExpenseFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getExpenses = async (filter: ExpenseFilter): Promise<PaginationResult<Expense>> => {
  const { data } = await axios.get(getUrlWithFilter(URL.EXPENSE_LIST_URL, filter));
  return data;
};
export const createExpense = async (formData: FormData): Promise<Expense> => {
  const { data } = await axios.post(URL.EXPENSE_LIST_URL, formData);
  return data;
};

export const updateExpense = async (id: number, formData: FormData): Promise<Expense> => {
  const { data } = await axios.put(URL.EXPENSE_DETAIL_URL(id), formData);
  return data;
};

export const deleteExpense = async (id: number): Promise<number> => {
  await axios.delete(URL.EXPENSE_DETAIL_URL(id));
  return id;
};
