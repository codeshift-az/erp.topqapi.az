import { DefaultModel } from "./default";

import { Product } from "./product";
import { Supplier } from "./supplier";

export type WarehouseItem = DefaultModel & {
  product: Product;
  category: string;
  supplier: Supplier;
  quantity: number;
  price: string;
  sale_count: number;
  catalog_price: number;
  is_sold: boolean;
  date: string;
  entry: number;
};

export type WarehouseItemStats = {
  product: string;
  category: string;
  name: string;
  quantity: number;
  sale_count: number;
};

export type WarehouseItemAllStats = {
  total_quantity: number;
  total_sale_count: number;
  total_investment: number;
  total_investment_left: number;
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
