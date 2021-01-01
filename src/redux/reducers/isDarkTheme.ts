interface IState {
  isDarkTheme: string;
}

const themeReducer = (state: IState = { isDarkTheme: "" }, action: any) => {
  switch (action.type) {
    case "SWITCH_THEME":
      return { ...state, isDarkTheme: action.payload };
    default:
      return state;
  }
};

export default themeReducer;
