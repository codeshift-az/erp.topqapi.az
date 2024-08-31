import { DefaultFilter } from "./default";

export type CatalogItemFilter = DefaultFilter & {
  product?: string;
  supplier?: string;
};
