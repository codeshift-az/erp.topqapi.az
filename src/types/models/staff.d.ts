import { DefaultModel } from "./default";

import { Branch } from "./branch";

export type Driver = DefaultModel & {
  name: string;
  total_orders: number;
  last_month: number;
};

export type Seller = DefaultModel & {
  name: string;
  branch: Branch;
  salary: number;
  total_orders: number;
  last_month: number;
  total_share: number;
  last_month_share: number;
};

export type Worker = DefaultModel & {
  name: string;
  total_orders: number;
  last_month: number;
};
