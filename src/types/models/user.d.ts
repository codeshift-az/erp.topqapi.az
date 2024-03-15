import { Branch } from "./branch";

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  type: 0 | 1 | 2 | 3;
  branch: Branch;
  is_staff: boolean;
  is_superuser: boolean;
};
