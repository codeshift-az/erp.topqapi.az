import { DefaultModel } from "./default";

import { Product } from "./product";
import { Supplier } from "./supplier";

export type WarehouseItem = DefaultModel & {
  product: Product;
  supplier: Supplier;
  quantity: number;
  price: string;
  sale_count: number;
  catalog_price: number;
  is_sold: boolean;
};

export type WarehouseItemStats = {
  product: number;
  name: string;
  quantity: number;
  sale_count: number;
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
