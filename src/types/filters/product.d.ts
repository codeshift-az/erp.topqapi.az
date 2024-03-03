import { DefaultFilter } from "./default";

export type ProductFilter = DefaultFilter & {
  name?: string;
  category?: string;
};
