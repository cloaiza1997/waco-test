import React, { useGlobal } from "reactn";
import { useHistory, Redirect } from "react-router-dom";

export default function Login() {

  const [globalState, setGlobalState] = useGlobal();
  const history = useHistory();
  // + Usuario logueado: Direcciona al home | - Usuario no logueado: Muestra el index
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
          onClick={() => loginGoogle(globalState.fb, setGlobalState, history)}
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
/**
 * Añade un usuario al local storage
 * @param {*} user Objeto a guardar
 */
function addLocalStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
}
/**
 * Agrega un usuario logueado a firebase
 * @param {*} firebase Instancia de firebase
 * @param {*} user Objeto usuario recibido de la autenticación de google
 */
function addFirebase(firebase, user) {
  let db = firebase.database().ref().child("login_users").child(user.uid);

  db.set({
    name: user.displayName,
    image: user.photoURL,
  });

  db.off();
}
/**
 * Inicia sesión con la API de google de firebase
 * @param {*} firebase Instancia de firebase
 * @param {*} setGlobalState Método para actualizar el estado global
 */
function loginGoogle(firebase, setGlobalState) {

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(function (result) {
      let user = result.user;
      addFirebase(firebase, user); // Agrega el usuario a firebase
      addLocalStorage(user); // Agrega el usuario al localStore
      setGlobalState({user}); // Actualiza el estado global
    })
    .catch(function (error) {
      console.log(error);
    });
}