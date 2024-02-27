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
