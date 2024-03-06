import { DefaultModel } from "./default";

import { Product } from "./product";
import { Supplier } from "./supplier";

export type WarehouseProduct = DefaultModel & {
  product: Product;
  quantity: number;
  price: number;
};

export type WarehouseEntry = DefaultModel & {
  products: WarehouseProduct[];
  supplier: Supplier;
  invoice: string;
  date: string;
};
