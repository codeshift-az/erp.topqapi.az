import { DefaultFilter } from "./default";

export type WarehouseItemFilter = DefaultFilter & {
  product?: string;
};

export type WarehouseEntryFilter = DefaultFilter & {
  invoice?: string;
  supplier?: string;
  date_start?: string;
  date_end?: string;
};
