import React, { useContext } from "react";
import clsx from "clsx";
import { useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddBoxIcon from "@material-ui/icons/AddBox";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { AccountCircle } from "@material-ui/icons";
import { Menu, MenuItem } from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";
import { clearThemeStore } from "../../redux/actions";
import { AuthContext } from "../../context/AuthContext";
import { useDispatch } from "react-redux";
import pageTitles from "./pageTitles";
import useHeaderAsideStyles from "./theme";

interface IHeaderAsideProps {
  children: React.ReactNode;
}

const HeaderAside: React.FC<IHeaderAsideProps> = ({ children }) => {
  const classes = useHeaderAsideStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openPopup = Boolean(anchorEl);
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {getPageTitle(pathName)}
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              className={classes.menuProfile}
            >
              <AccountCircle className={classes.avatar} />
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
              open={openPopup}
              onClose={handleClose}
            >
              <Link to="/settings" className={classes.link}>
                <MenuItem onClick={handleClose}>Настройки</MenuItem>
              </Link>
              <MenuItem onClick={logoutHandler}>Выйти</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/new" className={classes.link} onClick={handleDrawerClose}>
            <ListItem button>
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Добавить" />
            </ListItem>
          </Link>
          <Divider />
          <Link
            to="/portfolio"
            className={classes.link}
            onClick={handleDrawerClose}
          >
            <ListItem button>
              <ListItemIcon>
                <BusinessCenterIcon />
              </ListItemIcon>
              <ListItemText primary="Портфолио" />
            </ListItem>
          </Link>
          <Divider />
          <Link to="/info" className={classes.link} onClick={handleDrawerClose}>
            <ListItem button>
              <ListItemIcon>
                <LibraryBooksIcon />
              </ListItemIcon>
              <ListItemText primary="Акции" />
            </ListItem>
          </Link>
          <Divider />
          <Link
            to="/history"
            className={classes.link}
            onClick={handleDrawerClose}
          >
            <ListItem button>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="История" />
            </ListItem>
          </Link>
          <Divider />
          <Link
            to="/profit"
            className={classes.link}
            onClick={handleDrawerClose}
          >
            <ListItem button>
              <ListItemIcon>
                <MonetizationOnIcon />
              </ListItemIcon>
              <ListItemText primary="Доход" />
            </ListItem>
          </Link>
          <Divider />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default HeaderAside;
