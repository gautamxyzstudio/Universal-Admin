// utils.js
export const pxToVw = (px: number, width: number | undefined) => {
  if (width) {
    const vw = (px / width) * 100;
    return `${vw}vw`;
  } else {
    return 0;
  }
};

export const pxToVh = (px: number, height: number | undefined) => {
  if (height) {
    const vw = (px / height) * 100;
    return `${vw}vw`;
  } else {
    return 0;
  }
};
