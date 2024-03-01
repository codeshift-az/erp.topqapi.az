import { DefaultFilter } from "./default";

export type BranchFilter = DefaultFilter & {
  name?: string;
};
