import { PROJECT_NAME } from "@/config";

export const getPageTitle = (title: string) => {
  return title ? `${title} | ${PROJECT_NAME}` : `${PROJECT_NAME}`;
};

export const changeBodyAttribute = (attribute: string, value: string) => {
  if (document.body) document.body.setAttribute(attribute, value);
  return true;
};

export const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

export const getFormData = (object: any) => {
  const formData = new FormData();
  Object.keys(object).forEach((key) => formData.append(key, object[key]));
  return formData;
};

export const formatDate = (date: string, withTime = false) => {
  return withTime ? new Date(date).toLocaleString() : new Date(date).toLocaleDateString();
};
