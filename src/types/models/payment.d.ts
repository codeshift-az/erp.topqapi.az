import { DefaultModel } from "./default";

// Relations
import { Supplier } from "./supplier";

export type Payment = DefaultModel & {
  supplier: Supplier;
  amount: number;
  date: string;
  note: string;
};
