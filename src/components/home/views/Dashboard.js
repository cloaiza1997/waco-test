import React, { useState, useEffect } from "react";
import { useGlobal } from 'reactn';
import $ from "jquery";

import CircularProgress from '@material-ui/core/CircularProgress';

export default function Dashboard() {

  const [globalState] = useGlobal();
  const db_login = globalState.func.initDataBase("login_user");
  const db_users = globalState.func.initDataBase("users");
  const [list, setList] = useState([]);
  const [count, setCount] = useState(0);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    db_login.on("value", snap => {
      let data = [];
      $.each(snap.val(), function (key, element) {
        data.push({
          id: key,
          data: element,
        });
      });
      setList(data);
      setDisplay(false);
    });

    db_users.on("value", snap => {
      let i = 0;
      $.each(snap.val(), function (key, element) {
        i++;
      });
      setCount(i);
    });
  }, []);

  return (
    <div className="flx">
      <CircularProgress style={ display ? {} : { display: "none" } }/>
      <h1>Inicio</h1>
      <div className="flx dash-div-2">
        <h3>Usuarios Registrados</h3>
        <h1>{ count }</h1>
      </div>
      <br/>
      <br/>
      <div className="flx dash-div">
        <h5>Usuarios que han iniciado sesión</h5>
        <br/>
        <div className="flex">
          {
            list.map(value => (
              <div key={ value.id } className="flex">
                <img className="dash-user-img" src={value.data.image} alt={value.data.name} title={value.data.name}/>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}