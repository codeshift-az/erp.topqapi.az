import { DefaultModel } from "./default";

export type Expense = DefaultModel & {
  name: string;
  amount: number;
  date: string;
};
