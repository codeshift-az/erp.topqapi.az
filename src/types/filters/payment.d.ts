import { DefaultFilter } from "./default";

export type PaymentFilter = DefaultFilter & {
  supplier: string;
  date_start: string;
  date_end: string;
};
