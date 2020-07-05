import { Component, setGlobal } from "reactn";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
// import { useLocation } from "react-router-dom";

export default class Function extends Component {
    /**
     * Inicializa la conexión con firebase la cual solo se debe de hacer una vez
     */
    initFirebase() {
      // Crea variable global para consumir el servicio de firebase
      this.setGlobal({
        fb_data_base: firebase.initializeApp(this.global.firebaseConfig),
        fb: firebase
      });
    }

    getUser() {
      let user = localStorage.getItem("user");
      user = user != null ? JSON.parse(user) : null;
      setGlobal({ user });
    }
}