import { useCallback, useEffect, useState } from "react";

const storageName: string = "userData";

export const useAuth = () => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState({ name: "", surname: "" });

  const login = useCallback(
    (tokenJwt: string, id: string, name: string, surname: string) => {
      setToken(tokenJwt);
      setUserId(id);
      setUsername({ name, surname });

      localStorage.setItem(
        storageName,
        JSON.stringify({
          userId: id,
          token: tokenJwt,
          name,
          surname,
        })
      );
    },
    []
  );

  const logout = useCallback(() => {
    setToken("");
    setUserId("");
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName) || "{}");

    if (data && data.token) {
      login(data.token, data.userId, data.name, data.surname);
    }
  }, [login]);

  return { login, logout, token, userId, username };
};
