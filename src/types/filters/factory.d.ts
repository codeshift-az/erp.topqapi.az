import { DefaultFilter } from "./default";

export type FactoryProductFilter = DefaultFilter & {
  name?: string;
  category?: string;
};
