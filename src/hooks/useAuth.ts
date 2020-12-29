import { useCallback, useEffect, useState } from "react";

const storageName: string = "userData";

export const useAuth = () => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  const login = useCallback((tokenJwt: string, id: string) => {
    setToken(tokenJwt);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: tokenJwt })
    );
  }, []);

  const logout = useCallback(() => {
    setToken("");
    setUserId("");
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName) || "{}");

    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  return { login, logout, token, userId };
};
