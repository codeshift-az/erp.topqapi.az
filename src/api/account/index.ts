import axios from "@/api";

// URLs
import * as URL from "./urls";

// Types
import { User } from "@/types";

export const getAccount = async () => {
  return axios.get(URL.ACCOUNT_URL).then((response) => response.data as User);
};

export const updateAccount = async (data: FormData) => {
  return axios.put(URL.ACCOUNT_URL, data).then((response) => response.data as User);
};
