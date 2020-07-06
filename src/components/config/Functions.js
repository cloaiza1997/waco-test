import { Component, setGlobal } from "reactn";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default class Function extends Component {
    /**
     * Inicializa una base de datos en base a la instancia de firebase
     * @param {*} name Nombre de la base de datos a iniciar
     */
    initDataBase(name) {
      return this.global.fb.database().ref().child(name);
    }
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
    /**
     * Calcula la fecha del día actual
     * @return {string} date Fecha en formado YYYY-MM-DD
     */
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
    /**
     * Valida una cadena de tipo email
     * @param {*} email Email a validar
     * @return {boolean} Validación del email
     */
    validateEmail(email) {
      const pattern = /^([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      // Realiza la validacion del patron para el email
      return pattern.test(email.trim());
    }
    /**
     * Valida una cadena de texto
     * @param {*} text Texto a validar
     * @return Texto validado
     */
    validateText(text) {
      text = text.trim();

      if (text === "") {
        text = false;
      }

      return text;
    }
}