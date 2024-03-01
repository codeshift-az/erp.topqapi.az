import { DefaultFilter } from "./default";

export type CategoryFilter = DefaultFilter & {
  name?: string;
};
