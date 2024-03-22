import { DefaultFilter } from "./default";

export type DriverFilter = DefaultFilter & {
  name?: string;
};

export type SellerFilter = DefaultFilter & {
  name?: string;
  branch?: string;
  branch_id?: number;
};

export type WorkerFilter = DefaultFilter & {
  name?: string;
  date?: string;
};
