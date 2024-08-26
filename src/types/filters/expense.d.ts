import { DefaultFilter } from "./default";

export type ExpenseFilter = DefaultFilter & {
  name?: string;
  branch?: string;
  branch_id?: number;
  date_start?: string;
  date_end?: string;
};
