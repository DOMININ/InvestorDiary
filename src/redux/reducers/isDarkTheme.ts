interface IState {
  isDarkTheme: boolean;
}

const initialState = { isDarkTheme: false };

const themeReducer = (state: IState = initialState, action: any) => {
  switch (action.type) {
    case "CLEAR":
      return initialState;
    case "SWITCH_THEME":
      return { isDarkTheme: action.payload };
    default:
      return state;
  }
};

export default themeReducer;
