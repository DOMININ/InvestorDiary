import { createContext } from "react";

const noopArg = (
  token: string,
  userId: string,
  name: string,
  surname: string
) => {};
const noop = () => {};

export const AuthContext = createContext({
  token: "",
  userId: "",
  username: { name: "", surname: "" },
  login: noopArg,
  logout: noop,
  isAuthenticated: false,
});
