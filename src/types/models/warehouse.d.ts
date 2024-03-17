import { DefaultModel } from "./default";

import { Product } from "./product";
import { Supplier } from "./supplier";

export type WarehouseItem = DefaultModel & {
  product: Product;
  quantity: number;
  price: number;
};

export type WarehouseEntry = DefaultModel & {
  items: WarehouseItem[];
  supplier: Supplier;
  invoice: string;
  date: string;
};

export type WarehouseCartItem = DefaultModel & {
  product: Product;
  quantity: number;
  price: number;
};
