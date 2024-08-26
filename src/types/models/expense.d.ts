import { Branch } from "./branch";
import { DefaultModel } from "./default";

export type Expense = DefaultModel & {
  name: string;
  branch: Branch;
  amount: number;
  date: string;
};
