import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Card, Switch } from "@material-ui/core";

const Settings: React.FC = () => {
  const auth = useContext(AuthContext);

  const setThemeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    localStorage.setItem(
      `theme${auth.userId}`,
      JSON.stringify({ value: checked })
    );
  };

  return (
    <Card>
      Включить темную тему
      <Switch onChange={setThemeHandler} color="primary" name="checkedB" />
    </Card>
  );
};

export default Settings;
