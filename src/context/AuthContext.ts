import { createContext } from "react";

const noop = (token: string, userId: string) => {};

export const AuthContext = createContext({
  token: "",
  userId: "",
  login: noop,
  isAuthenticated: false,
});
