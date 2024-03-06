import axios from "@/api";

// Helpers
import { getUrlWithFilter } from "@/helpers";

// Types
import { WarehouseProduct } from "@/types/models";
import { WarehouseProductFilter } from "@/types/filters";
import { PaginationResult } from "@/types/result";

// URLs
import * as URL from "./urls";

export const getWarehouseProducts = async (
  filter: WarehouseProductFilter
): Promise<PaginationResult<WarehouseProduct>> => {
  const { data } = await axios.get(getUrlWithFilter(URL.WAREHOUSE_PRODUCT_LIST_URL, filter));
  return data;
};
