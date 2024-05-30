import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import { Branch } from "@/types/models";
import { BranchFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getBranches = async (
  filter: BranchFilter
): Promise<PaginationResult<Branch>> => {
  const { data } = await axios.get(
    getUrlWithFilter(URL.BRANCH_LIST_URL, filter)
  );
  return data;
};

export const getBranch = async (id: number): Promise<Branch> => {
  const { data } = await axios.get(URL.BRANCH_DETAIL_URL(id));
  return data;
};

export const createBranch = async (formData: FormData): Promise<Branch> => {
  const { data } = await axios.post(URL.BRANCH_LIST_URL, formData);
  return data;
};

export const updateBranch = async (
  id: number,
  formData: FormData
): Promise<Branch> => {
  const { data } = await axios.patch(URL.BRANCH_DETAIL_URL(id), formData);
  return data;
};

export const deleteBranch = async (id: number): Promise<number> => {
  await axios.delete(URL.BRANCH_DETAIL_URL(id));
  return id;
};
