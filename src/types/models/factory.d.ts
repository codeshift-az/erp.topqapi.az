import { DefaultModel } from "./default";

// Relations
import { Category } from "./category";

export type FactoryProduct = DefaultModel & {
  name: string;
  category: Category;
};
