import themeReducer from "./isDarkTheme";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  isDarkTheme: themeReducer,
});

export default allReducers;
export type RootState = ReturnType<typeof allReducers>;
