import React, { useState } from 'react';
import { useGlobal } from 'reactn';
import { useHistory } from "react-router-dom";
import $ from "jquery";
// Class
import Dashboard from "./views/Dashboard";
import Profile from "./views/Profile";
import UserCreate from "./views/UserCreate";
import UserEdit from "./views/UserEdit";
import UserList from "./views/UserList";
// Components
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// Icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone'; 
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleAltTwoToneIcon from '@material-ui/icons/PeopleAltTwoTone';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import PowerSettingsNewTwoToneIcon from '@material-ui/icons/PowerSettingsNewTwoTone';

export default function Home() {
  // Constants
  const [globalState, setGlobalState] = useGlobal(); // Estado global
  const [open, setOpen] = React.useState(false);
  const [view, setView] = useState(<Dashboard/>); // Estado local, por defecto carga una vista
  const classes = useStyles();
  const history = useHistory(); // Historial
  const theme = useTheme();
  // Functions
  /**
   * Actualiza el estado para renderizar un nuevo componente
   * @param {*} view Nombre de la vista a mostrar
   */
  const changeView = (view = "") => {
    let component_view = "";

    switch(view) {
      case "create":
        component_view = <UserCreate/>
      break;
      case "edit":
        component_view = <UserEdit changeView={changeView}/>
      break;
      case "list":
        component_view = <UserList changeView={changeView}/>
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

  const handleDrawerOpen = () => {
    setOpen(true);
    $("#sign").show();
  };
  
  const handleDrawerClose = () => {
    setOpen(false);
    $("#sign").hide();
  };
  /**
   * Cierre de sesión
   */
  const logout = () => {
    setGlobalState({ user: null }); // Borra el estado global
    localStorage.removeItem("user"); // Elimina el usuario del local storage
    history.push("/"); // Redirecciona al inicio
  }
  // Render
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
            {/* Título y botón de cierre de sesión */}
            <Typography variant="h6" noWrap>
              Gestión de Usuarios
            </Typography>
            <IconButton onClick={logout} title="Cerrar Sesión">
              <PowerSettingsNewTwoToneIcon/>
            </IconButton>
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
        {/* Cabecera navegación */}
        <div className={classes.toolbar}>
          <div className="div-logo">
            <a href="https://wacoservices.com/" target="_blank" rel="noopener noreferrer" className="o-7x" title="Ir a la página de Waco Services">
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
        {/* Listado de opciones */}
        <List>
          <ListItem button title="Mi Perfil" onClick={() => changeView("profile")}>
              <ListItemIcon>
                <img className="nav-user-img" src={globalState.user.photoURL} alt={globalState.user.displayName}/>
              </ListItemIcon>
              <span className="p-10x"></span>
              <ListItemText primary={globalState.user.displayName} />
          </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button title="Ir al Inicio" onClick={() => changeView()}>
              <ListItemIcon><HomeTwoToneIcon className="f-2_5r"/></ListItemIcon>
              <span className="p-10x"></span>
              <ListItemText primary="Inicio" />
            </ListItem>
            <ListItem button title="Crear un Usuario" onClick={() => changeView("create")}>
              <ListItemIcon><PersonAddTwoToneIcon className="f-2_5r"/></ListItemIcon>
              <span className="p-10x"></span>
              <ListItemText primary="Crear Usuario" />
            </ListItem>
            <ListItem button title="Ver Listado de Usuario" onClick={() => changeView("list")}>
              <ListItemIcon><PeopleAltTwoToneIcon className="f-2_5r"/></ListItemIcon>
              <span className="p-10x"></span>
              <ListItemText primary="Listar Usuarios" />
            </ListItem>
        </List>
        <footer className="footer center p-10x">
          <div>
            <span id="sign" hidden={true}>Desarrollado por Cristian Loaiza</span>
            <span>&copy; 2020</span>
            </div>
        </footer>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        { view }
      </main>
    </div>
  );
}
// Estilos para el dashboard
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
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));