import { DefaultModel } from "./default";

export type Branch = DefaultModel & {
  name: string;
  total_profit: number;
  current_month_orders: number;
  current_month_profit: number;
  past_month_orders: number;
  past_month_profit: number;
};
