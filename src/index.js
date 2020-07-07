import React from 'react';
import ReactDOM from 'react-dom';
import { setGlobal } from 'reactn';
import * as serviceWorker from './serviceWorker';

import GlobalState from './components/config/GlobalState';
import Router from "./components/router/Router";

setGlobal(GlobalState);

GlobalState.func.initFirebase();
GlobalState.func.getUser();

ReactDOM.render(
    <Router />
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
