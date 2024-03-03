import { DefaultModel } from "./default";

import { Branch } from "./branch";

export type Driver = DefaultModel & {
  name: string;
};

export type Seller = DefaultModel & {
  name: string;
  branch: Branch;
  salary: number;
};

export type Worker = DefaultModel & {
  name: string;
};
