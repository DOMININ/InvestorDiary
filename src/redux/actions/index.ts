export const switchTheme = (bool: boolean) => {
  return {
    type: "SWITCH_THEME",
    payload: bool,
  };
};
