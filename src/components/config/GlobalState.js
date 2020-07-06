import Functions from "./Functions";

export default {
  func: new Functions(), // Biblioteca de funciones
  firebaseConfig: {
    apiKey: "AIzaSyBu-Y1aF3ZNa5kgQ_9FGZbshOlFr0vApOo",
    authDomain: "test-waco-cl.firebaseapp.com",
    databaseURL: "https://test-waco-cl.firebaseio.com",
    projectId: "test-waco-cl",
    storageBucket: "test-waco-cl.appspot.com",
    messagingSenderId: "951177252430",
    appId: "1:951177252430:web:009693506caf0cbf38bd1f",
  }, // Firebase configuración
  fb_data_base: null, // Firebase base de datos Functions.js init_firebase()
  fb: null, // Firebase instancia, se inicializa en la clase Functions.js init_firebase()
  user: null, // Objeto del usuario logueado de google
};