import { DefaultFilter } from "./default";

export type DriverFilter = DefaultFilter & {
  name?: string;
};

export type SellerFilter = DefaultFilter & {
  name?: string;
  branch?: string;
};

export type WorkerFilter = DefaultFilter & {
  name?: string;
};
