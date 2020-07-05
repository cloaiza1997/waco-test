import React from "react";
import { useGlobal } from "reactn";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "../login/Login";
import Home from "../home/Home";
import ErrorPage from "../error/ErrorPage";

function Router () {

  const [ globalState ] = useGlobal();

  // console.log(globalState);

  let user_login = {
    home: ""
  };

  // console.log(globalState["user"]);
  if(globalState.user != null) {
    user_login.home = <Route path="/home" component={Home} />;
  }

  return(
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />

        { user_login.home }

        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
