import React, { useContext } from "react";
import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import useHeaderStyles from "./theme";
import { Link, useLocation } from "react-router-dom";
import { clearThemeStore } from "../../redux/actions";
import { useDispatch } from "react-redux";
import pageTitles from "../../pages/pageTitles";

const Header: React.FC = () => {
  const classes = useHeaderStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();

  const { name = "Имя", surname = "Фамилия" } = auth.username;

  const changeUsernameFormat = (name: string, surname: string) => {
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    surname = surname.charAt(0).toUpperCase();
    return `${name} ${surname}.`;
  };

  const formattedUsername = changeUsernameFormat(name, surname);

  const location = useLocation();
  const pathName = location.pathname.slice(1);
  const getPageTitle = (pathName: string) => {
    return pageTitles[pathName];
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    auth.logout();
    dispatch(clearThemeStore());
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {getPageTitle(pathName)}
          </Typography>
          {/*TODO: сделать нормально*/}
          <Link to="/portfolio">Портфолио</Link>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              className={classes.menuProfile}
            >
              <AccountCircle />
              {formattedUsername}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/settings" className={classes.link}>
                  Настройки
                </Link>
              </MenuItem>
              <MenuItem onClick={logoutHandler}>Выйти</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
