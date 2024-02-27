import { PROJECT_NAME } from "@/config";

export const getPageTitle = (title: string) => {
  return title ? `${title} | ${PROJECT_NAME}` : `${PROJECT_NAME}`;
};

export const getOptions = (data: any[] | null, label = "name", value = "id") => {
  return data?.map((item) => ({ label: item[label], value: item[value] })) || [];
};
