import { DefaultModel } from "./default";

import { Branch } from "./branch";
import { Driver, Seller, Worker } from "./staff";
import { Product } from "./product";
import { Supplier } from "./supplier";
import { Category } from "./category";

export type OrderItem = DefaultModel & {
  product: Product;
  supplier: Supplier;
  size: string;
  category: Category;
  quantity: number;
  price: number;
  is_sold: boolean;
  is_factory_ready: boolean;
  profit: number;
  date: string;
};

export type OrderExpense = DefaultModel & {
  name: string;
  price: number;
};

export type Order = DefaultModel & {
  items: OrderItem[];
  expenses: OrderExpense[];

  branch: Branch;
  seller: Seller;

  customer: string;
  phone: string;
  address: string;

  note: string;

  discount: number;
  payed: number;
  seller_share: number;
  sale_date: string;

  driver: Driver;
  delivery_date: string;
  delivery_price: string;

  worker: Worker;
  install_date: string;
  install_price: string;

  status: number;
};

export type OrderCartItem = DefaultModel & {
  product: Product;
  supplier: Supplier;
  size: string;
  quantity: number;
  price: number;
};
