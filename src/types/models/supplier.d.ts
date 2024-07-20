import { DefaultModel } from "./default";

export type Supplier = DefaultModel & {
  name: string;
  total_price: string;
  total_payed: string;
};

export type SupplierStats = {
  total_price: string;
  total_payed: string;
};

export type Transaction = DefaultModel & {
  amount: string;
  type: boolean;
  date: string;
};
