import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Card, Switch } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { switchTheme } from "../../redux/actions";

const Settings: React.FC = () => {
  const auth = useContext(AuthContext);
  const data = JSON.parse(
    localStorage.getItem(`theme${auth.userId}`) || `false`
  );
  const [isDarkTheme, setIsDarkTheme] = useState(data ? data.value : false);
  const dispatch = useDispatch();

  const setThemeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;

    localStorage.setItem(
      `theme${auth.userId}`,
      JSON.stringify({ value: checked })
    );

    setIsDarkTheme(checked);
    dispatch(switchTheme(checked));
  };

  return (
    <Card>
      Включить темную тему
      <Switch
        onChange={setThemeHandler}
        checked={isDarkTheme}
        color="primary"
        name="checkedB"
      />
    </Card>
  );
};

export default Settings;
