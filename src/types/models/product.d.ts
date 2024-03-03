import { DefaultModel } from "./default";

import { Category } from "./category";

export type Product = DefaultModel & {
  name: string;
  category: Category;
};
