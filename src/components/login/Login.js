import React, { useGlobal, setGlobal } from "reactn";
import { useHistory, Redirect } from "react-router-dom";

export default function Login() {

  const [globalState] = useGlobal();
  let history = useHistory();
 
  if (globalState.user != null) {
    return <Redirect to="/home" />
  } else {
    return (
      <div className="login">
        <div className="logo">
          <img
            src={require("./../../assets/img/search.png")}
            alt="Users"
            className="w-100x"
          />
        </div>
        <h1>Sistema de Gestión de Usuarios</h1>
        <button
          onClick={() => loginGoogle(globalState.fb, history)}
          className="btn-rnd-i"
          title="Inicia sesión con Google"
        >
          <div>
            <img
              src={require("./../../assets/img/google.png")}
              alt="Google SignIn"
              className="w-30x"
            />
            <span className="p-5x"></span>
            <span>Iniciar sesión con Google</span>
          </div>
        </button>
      </div>
    );
  }
}

function loginGoogle(firebase, history) {

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(function (result) {
      console.log(result);
      localStorage.setItem("user", JSON.stringify(result.user));
      setGlobal({ user: result.user});
      history.push("/home");
    })
    .catch(function (error) {
      console.log(error);
    });
}