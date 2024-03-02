import { CSSObjectWithLabel } from "react-select";

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

export const getSelectStyle = (validation: any, field: string) => {
  return {
    menu: (base: CSSObjectWithLabel) => ({
      ...base,
      zIndex: 2,
    }),
    control: (base: CSSObjectWithLabel) => ({
      ...base,
      border:
        validation.touched[field] && validation.errors[field]
          ? "1px solid #f1556c"
          : "1px solid #ced4da",
    }),
  };
};
