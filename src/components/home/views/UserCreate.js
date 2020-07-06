import React, { useState } from 'react';
import { useGlobal } from 'reactn';

import TextField from '@material-ui/core/TextField';
export default function UserCreate() {

  const [globalState] = useGlobal();
  const [date, setDate] = useState(globalState.func.getDate());

  

  return (
    <div className="flx">
      <h2>Creación de Usuario</h2>
      <br/>
      <TextField variant="outlined" type="text" className="input" label="Nombre"/>
      <br/>
      <TextField variant="outlined" type="number" className="input" label="Número de Identidad"/>
      <br/>
      <TextField variant="outlined" type="email" className="input" label="Correo Electrónico"/>
      <br/>
      <TextField variant="outlined" type="date" className="input" label="Fecha de Nacimiento" defaultValue={date}/>
      <br/>
    </div>
  );
}