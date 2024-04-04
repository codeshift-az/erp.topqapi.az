import { DefaultModel } from "./default";

import { Branch } from "./branch";

export type StaffStats = {
  current_month_orders: number;
  past_month_orders: number;
  current_month_share: number;
  past_month_share: number;
};

export type Driver = DefaultModel &
  StaffStats & {
    name: string;
  };

export type Seller = DefaultModel &
  StaffStats & {
    name: string;
    branch: Branch;
    salary: number;
  };

export type Worker = DefaultModel &
  StaffStats & {
    name: string;
  };
