import { DefaultModel } from "./default";

export type Supplier = DefaultModel & {
  name: string;
  total_price: string;
  total_payed: string;
};
