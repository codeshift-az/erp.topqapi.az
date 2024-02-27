export type Status = {
  loading: boolean;
  success: boolean;
  failure: boolean;
  lastAction: string | null;
};

export type UpdateArgs = {
  id: number;
  data: FormData;
};
