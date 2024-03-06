export type User = {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  type: 0 | 1 | 2 | 3;
  is_staff: boolean;
  is_superuser: boolean;
};
