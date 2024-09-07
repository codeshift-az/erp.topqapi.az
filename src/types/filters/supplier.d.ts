import { DefaultFilter } from "./default";

export type SupplierFilter = DefaultFilter & {
  id?: number;
  name?: string;
  product?: string;
};

export type TransactionFilter = DefaultFilter;
