import React, { useState } from 'react';
import { useGlobal } from 'reactn';

import TextField from '@material-ui/core/TextField';

import { Notify, showNotify } from "../../partials/Notify";

import AssignmentIndTwoToneIcon from '@material-ui/icons/AssignmentIndTwoTone';
import DateRangeTwoToneIcon from '@material-ui/icons/DateRangeTwoTone';
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';
import PermIdentityTwoToneIcon from '@material-ui/icons/PermIdentityTwoTone';

import Confirm from "./../../partials/Confirm";

export default function UserCreate() {

  const [globalState] = useGlobal();
  const [date] = useState(globalState.func.getDate());
  const [birth, setBirth] = useState(date);
  const [db] = useState(globalState.func.initDataBase("users"));
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  // Functions
  /**
   * Agrega un usuario en firebase
   */
  const addUser = () => {
      // Consulta si ya existe un objeto en la base de datos con el id
      db.child(id).once("value", snap => {
        // + Id no existe, se inserta el objeto | - Existe, se muestra notificación
        if (snap.val() == null) {
          db.child(id).set({
            name: name,
            email: email,
            birth: birth,
          });
          showNotify().success("Usuario creado correctamente");
          // Limpieza de campos
          setId("");
          setName("");
          setEmail("");
          setBirth(date);
        } else {
          showNotify().error("La cédula ya se encuentra registrada");
        }
      });
      
      db.off();
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
      <div>
        <img
            src={require("./../../../assets/img/user_1.png")}
            alt="Usuario"
            className="w-50x"
          />
          <img
            src={require("./../../../assets/img/user_3.png")}
            alt="Usuario"
            className="w-50x"
          />
          <img
            src={require("./../../../assets/img/user_2.png")}
            alt="Usuario"
            className="w-50x"
          />
      </div>
      <h2>Creación de Usuario</h2>
      <br />
      <div className="flex w-100">
        <AssignmentIndTwoToneIcon className="f-2_5r" />
        <TextField
          variant="outlined"
          type="number"
          className="input"
          label="Número de Identidad"
          name="id"
          value={id}
          onChange={(id) => setId(id.target.value)}
        />
      </div>
      <br />
      <div className="flex w-100">
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
      <div className="flex w-100">
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
      <button onClick={openModal} className="btn-rnd-i" title="Crear Usuario">
        <div>
          <img
            src={require("./../../../assets/img/save.png")}
            alt="Save"
            className="w-30x"
          />
          <span className="p-5x"></span>
          <span>Guardar Usuario</span>
        </div>
      </button>

      <Notify />
      <Confirm open={open} setOpen={setOpen} action={addUser} message="¿Confirma la creación del usuario?"/>
    </div>
  );
}