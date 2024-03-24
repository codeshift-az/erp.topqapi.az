import { DefaultModel } from "./default";

import { Branch } from "./branch";
import { Driver, Seller, Worker } from "./staff";
import { Product } from "./product";
import { Supplier } from "./supplier";
import { Category } from "./category";

export type OrderItem = DefaultModel & {
  product: Product;
  supplier: Supplier;
  category: Category;
  quantity: number;
  price: number;
  is_sold: boolean;
  date: string;
};

export type Order = DefaultModel & {
  items: OrderItem[];

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

  worker: Worker;
  install_date: string;

  status: number;
};

export type OrderCartItem = DefaultModel & {
  product: Product;
  supplier: Supplier;
  quantity: number;
  price: number;
};
