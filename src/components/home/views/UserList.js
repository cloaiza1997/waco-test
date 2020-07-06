import React, { useState, useEffect } from "react";
import { useGlobal } from 'reactn';

import $ from "jquery";

import Table from "../../partials/Table";

export default function UserList() {
  const [globalState] = useGlobal();
  const [data, setData] = useState([]);


  useEffect(() => {
      let db = globalState.func.initDataBase("users");

      db.once("value", snap => {

        let list = [];
        $.each(snap.val(), function (key, element) {
          list.push({
            id: key,
            name: element.name
          });

        })
        setData(<Table data={ list }/>);
      });

  }, []);

  return (
    <div className="div-dataTable">
      { data }
      <div className="flx center">
        <img src={ require("./../../../assets/img/scroll.gif") } alt="Scroll" className="w-70x" style={{ transform: "rotate(270deg)" }}/>
        <label>Desliza sobre la tabla para desplazarte lateralmente en su contenido</label>
      </div>
    </div>
  );
}