import { Default } from "./default";
import { Branch } from "./branch";

export type Driver = Default & {
  name: string;
};

export type Seller = Default & {
  name: string;
  branch: Branch;
  salary: number;
};

export type Worker = Default & {
  name: string;
};
