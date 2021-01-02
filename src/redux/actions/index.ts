export const switchTheme = (bool: boolean) => {
  return {
    type: "SWITCH_THEME",
    payload: bool,
  };
};

export const clearThemeStore = () => {
  return {
    type: "CLEAR",
  };
};
