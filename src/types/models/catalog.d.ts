import { DefaultModel } from "./default";

import { Product } from "./product";
import { Supplier } from "./supplier";

export type CatalogItem = DefaultModel & {
  product: Product;
  supplier: Supplier;
  price: number;
};
