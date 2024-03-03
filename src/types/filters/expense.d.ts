import { DefaultFilter } from "./default";

export type ExpenseFilter = DefaultFilter & {
  name?: string;
  date_start?: string;
  date_end?: string;
};
