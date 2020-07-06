import { Component, setGlobal } from "reactn";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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
    getDate() {
      let date = new Date();
      let month = date.getMonth() + 1; 
      month = month < 10 ? "0" + month : month;
      let day = date.getDate();
      day = day < 10 ? "0" + day : day;
      return `${date.getFullYear()}-${month}-${day}`;
    }
    /**
     * Obtiene el usuario almacenado en el localStorage y lo agrega al estado global
     */
    getUser() {
      let user = localStorage.getItem("user");
      // Si existe el usuario lo parsea y agrega al estado global
      user = user != null ? JSON.parse(user) : null;
      setGlobal({ user });
    }
}