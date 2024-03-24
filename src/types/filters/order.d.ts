import { DefaultFilter } from "./default";

export type OrderItemFilter = DefaultFilter & {
  product?: string;
  supplier?: string;
  category?: string;
  date_start?: string;
  date_end?: string;
};

export type OrderFilter = DefaultFilter & {
  customer?: string;
  phone?: string;
  status?: number;
  date_start?: string;
  date_end?: string;
};
