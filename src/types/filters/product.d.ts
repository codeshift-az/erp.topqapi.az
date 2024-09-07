import { DefaultFilter } from "./default";

export type ProductFilter = DefaultFilter & {
  id?: number;
  name?: string;
  category?: string;
};
