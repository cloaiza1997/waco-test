import React from "react";
import { useGlobal } from 'reactn';

export default function Profile() {

  const [globalState] = useGlobal();
  const user = globalState.user;

  return (
    <div className="flx div-usr-create">
      <h1>Mi Perfil</h1>
      <img className="profile-logo" src={user.photoURL} alt={user.displayName}/>
        <h3>{ user.displayName }</h3>
        <label>{ user.email }</label>
    </div>
  );
}