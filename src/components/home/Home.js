import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
import { useHistory } from "react-router-dom";
// Class
import Dashboard from "./views/Dashboard";
import UserCreate from "./views/UserCreate";
import UserList from "./views/UserList";
import Profile from "./views/Profile";
// Components
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
// Icons
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PowerSettingsNewTwoToneIcon from '@material-ui/icons/PowerSettingsNewTwoTone';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone'; 

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Home() {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [globalState, setGlobalState] = useGlobal();

  let history = useHistory();

  const logout = () => {
    setGlobalState({ user: null });
    localStorage.removeItem("user");
    history.push("/");
  }

  const [view, setView] = useState();

  const changeView = (view = "") => {

    let component_view = "";

    switch(view) {
      case "create":
        component_view = <UserCreate/>
      break;
      case "list":
        component_view = <UserList/>
      break;
      case "profile":
        component_view = <Profile/>
      break;
      default:
        component_view = <Dashboard/>
      break;
    }

    setView(component_view);
  }

  useEffect(() => {
    changeView();
  });

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
            title="Abrir Menú"
          >
            <MenuIcon />
          </IconButton>
          <div className="toolbar">
            <Typography variant="h6" noWrap>
              Gestión de Usuarios
            </Typography>
            <Button className="logout" onClick={logout} title="Cerrar Sesión">
              <PowerSettingsNewTwoToneIcon/>
            </Button>
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
          <div className="div-logo">
            <a href="https://wacoservices.com/" target="_blank" className="o-7x" title="Ir a la página de Waco Services">
              <img className="w-50x" src={ require("../../assets/img/logo-small.png") } alt="Waco Services"/>
            </a>
            <span className="p-5x"></span>
            <h5 className="m-0x">Waco Services Test</h5>  
          </div>
          <IconButton onClick={handleDrawerClose} title="Minimizar Menú">
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button title="Mi Perfil" onClick={() => changeView("profile")}>
              <ListItemIcon>
                <img className="nav-user-img" src={globalState.user.photoURL} alt={globalState.user.displayName}/>
              </ListItemIcon>
              <ListItemText primary={globalState.user.displayName} />
          </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button title="Ir al Inicio" onClick={() => changeView()}>
              <ListItemIcon><HomeTwoToneIcon/></ListItemIcon>
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem button title="Crear un Usuario" onClick={() => changeView("create")}>
              <ListItemIcon><PersonAddTwoToneIcon/></ListItemIcon>
              <ListItemText primary="Crear Usuario" />
            </ListItem>
            <ListItem button title="Ver Listado de Usuario" onClick={() => changeView("list")}>
              <ListItemIcon><PeopleAltTwoToneIcon/></ListItemIcon>
              <ListItemText primary="Listar Usuarios" />
            </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        
        { view }

      </main>
    </div>
  );
}