import { DefaultFilter } from "./default";

export type ProductRecordFilter = DefaultFilter & {
  product?: string;
  supplier?: string;
};
