import { createContext } from "react";

const noopArg = (token: string, userId: string) => {};
const noop = () => {};

export const AuthContext = createContext({
  token: "",
  userId: "",
  login: noopArg,
  logout: noop,
  isAuthenticated: false,
});
