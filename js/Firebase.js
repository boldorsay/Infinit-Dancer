import { initializeApp } from "firebase/app";
import {getAuth, signInAnonymously, onAuthStateChanged} from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";

// import {signInAnonymously'} from "firebase/signInAnonymously"
// import { getAnalytics } from "firebase/analytics";

import EventEmitter from "./EventEmitter.js";

export default class FireBase extends EventEmitter {
  constructor() {
    super();
    const firebaseConfig = {
        apiKey: "AIzaSyDa6PohSSSvlxDsN_JotMWzyefOMZ66MJ0",
        authDomain: "ping-pong-2d7e1.firebaseapp.com",
        databaseURL: "https://ping-pong-2d7e1-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "ping-pong-2d7e1",
        storageBucket: "ping-pong-2d7e1.appspot.com",
        messagingSenderId: "284764076175",
        appId: "1:284764076175:web:aff82641fa74c92e3cd8fa",
        measurementId: "G-2CCT5LFPEG"
      };    

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // on s'authentifie de manière anonyme
    const auth = getAuth();


    signInAnonymously(auth).then(() => {
      // console.log("all good, signed in");
    });

    // on récupère l'objet DATABASE
    this.DATABASE = getDatabase();

    //
    //écouteur (Compatible P5)
    const path = ref(this.DATABASE, "danse");
    onValue(path, (snapshot) => {
        if(!this.resume){
            this.resume = true;
          }
          else{
            const val = snapshot.val();
            this.emit("messageRecived", [val]);

        }

    });
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
      }
    });
  }
  send(_path, _val) {
    const path = ref(this.DATABASE, _path);
    set(path, _val);
  }

  // send(objet) {
  //   //ecriture dans la base de donnee
  //   const pathToWrite = ref(this.DATABASE, "danse");
  //   set(pathToWrite, objet);
  // }
}
