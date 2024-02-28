import { DefaultFilter } from "./default";

export type SupplierFilter = DefaultFilter & {
  name?: string;
};
