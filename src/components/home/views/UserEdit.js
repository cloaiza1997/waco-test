import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';

import TextField from '@material-ui/core/TextField';

import { Notify, showNotify } from "../../partials/Notify";

import Button from '@material-ui/core/Button';

import ArrowBackTwoToneIcon from '@material-ui/icons/ArrowBackTwoTone';
import DateRangeTwoToneIcon from '@material-ui/icons/DateRangeTwoTone';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';
import PermIdentityTwoToneIcon from '@material-ui/icons/PermIdentityTwoTone';

import Confirm from "./../../partials/Confirm";

export default function UserEdit(props) {

  const [globalState] = useGlobal();
  const [db] = useState(globalState.func.initDataBase("users"));
  const [id] = useState(globalState.user_edit_id);
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    db.child(id).once("value", snap => {
      let user = snap.val();
      setName(user.name);
      setEmail(user.email);
      setBirth(user.birth);
    });

    return db.off();
  }, [db, id]);
  // Functions
  /**
   * Agrega un usuario en firebase
   */
  const editUser = () => {
    db.child(id).set({
      name: name,
      email: email,
      birth: birth,
    });
    showNotify().success("Usuario editado correctamente");
  
    db.off();

    setTimeout(() => {
      props.changeView("list");
    }, 2000);
  }

  const openModal = () => {
    // Extracción de métodos de validación de datos
    const validateEmail = globalState.func.validateEmail;
    const validateText = globalState.func.validateText;
    // + Datos correctos | - Datos incorrectos
    if (validateText(id) && validateText(name) && validateEmail(email)) {
      setOpen(true);
    } else {
      showNotify().error("Por favor diligenciar todos los campos");
    }
  }

  return (
    <div className="flx div-usr-create">
      <Button
      onClick={() => props.changeView("list") }
        variant="contained"
        className="btn-rnd-i"
        title="Regresar"
        style={ {background: "#282831"} }
      >
          <ArrowBackTwoToneIcon/>
          <span className="p-5x"></span>
          <span>Regresar</span>
      </Button>
      <br/>
      <div>
        <img
            src={require("./../../../assets/img/user_4.png")}
            alt="Usuario"
            className="w-50x"
          />
          <img
            src={require("./../../../assets/img/user_3.png")}
            alt="Usuario"
            className="w-50x"
          />
          <img
            src={require("./../../../assets/img/user_5.png")}
            alt="Usuario"
            className="w-50x"
          />
      </div>
      <h2>Edición de Usuario ({id})</h2>
      <br />
      <div className="flex">
        <PermIdentityTwoToneIcon className="f-2_5r" />
        <TextField
          variant="outlined"
          type="text"
          className="input"
          label="Nombre"
          name="name"
          value={name}
          onChange={(name) => setName(name.target.value)}
        />
      </div>
      <br />
      <div className="flex">
        <EmailTwoToneIcon className="f-2_5r" />
        <TextField
          variant="outlined"
          type="email"
          className="input"
          label="Correo Electrónico"
          name="email"
          value={email}
          onChange={(email) => setEmail(email.target.value)}
        />
      </div>
      <br />
      <div className="flex w-100">
        <DateRangeTwoToneIcon className="f-2_5r" />
        <TextField
          variant="outlined"
          type="date"
          className="input"
          label="Fecha de Nacimiento"
          name="birth"
          value={birth}
          onChange={(birth) => setBirth(birth.target.value)}
        />
      </div>
      <br />
      <button onClick={openModal} className="btn-rnd-i" title="Editar Usuario">
        <div>
          <img
            src={require("./../../../assets/img/register.png")}
            alt="Save"
            className="w-30x"
          />
          <span className="p-5x"></span>
          <span>Actualizar Usuario</span>
        </div>
      </button>

      <Notify />
      <Confirm open={open} setOpen={setOpen} action={editUser} message="¿Confirma la edición del usuario?"/>
    </div>
  );
}