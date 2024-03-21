import { DefaultFilter } from "./default";

export type FactoryProductFilter = DefaultFilter & {
  name?: string;
  category?: string;
};

export type FactoryStorageItemFilter = DefaultFilter & {
  product?: string;
  date_start?: string;
  date_end?: string;
};
