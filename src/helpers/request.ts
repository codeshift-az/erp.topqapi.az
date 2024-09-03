import { convertDateRangeFilter } from "./date";

export const getUrlWithFilter = (url: string, filter: any) => {
  filter = convertDateRangeFilter(filter);
  Object.keys(filter).forEach((key) => {
    if (
      filter[key] === "" ||
      filter[key] === null ||
      filter[key] === undefined
    ) {
      delete filter[key];
    }
  });
  const params = new URLSearchParams(filter);
  return `${url}?${params.toString()}`;
};

export const getFormData = (object: any) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
};
