import React, { useState, useEffect } from "react";
import { useGlobal } from 'reactn';

import CircularProgress from '@material-ui/core/CircularProgress';

import $ from "jquery";

import Table from "../../partials/Table";

export default function UserList(props) {
  const [globalState, setGlobalState] = useGlobal();
  const [table, setTable] = useState();
  const [db] = useState(globalState.func.initDataBase("users"));
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    
    const deleteItems = (items) => {
      items.map(id => db.child(id).remove());
      props.changeView("list");
    };  

    const edit = (id) => {
      setGlobalState({ user_edit_id: id});
      props.changeView("edit");
    };

    db.on("value", snap => {
      let list = [];
      $.each(snap.val(), function (key, element) {
        list.push({
          id: key,
          name: element.name
        });
      });

      setTable(null);
      setTable(<Table data={list} deleteItems={deleteItems} edit={edit}/>);
      setDisplay(false);
    });

  }, [db, props, setGlobalState]);

  return (
    <div className="div-dataTable">
      <div className="flx center">
        <CircularProgress style={ display ? {} : { display: "none" } }/>
      </div>
      { table }
      <div className="flx center lbl-hide" style={{ display: "none" }}>
        <img src={ require("./../../../assets/img/scroll.gif") } alt="Scroll" className="w-70x" style={{ transform: "rotate(270deg)" }}/>
        <label>Desliza sobre la tabla para desplazarte lateralmente en su contenido</label>
      </div>
    </div>
  );
}