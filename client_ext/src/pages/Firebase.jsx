import firebase from "firebase/compat/app";
import "firebase/compat/auth";


export const Firebase = () => {

  // TODO: Replace the following with your app's Firebase project configuration
  // See: https://firebase.google.com/docs/web/learn-more#config-object
  const firebaseConfig = {
    apiKey: "AIzaSyDFaveuhveIz8eO9z_pKgwZ0-Y1Gt4PO6s",
    authDomain: "twitch-brenda-7224d.firebaseapp.com",
    databaseURL: "https://twitch-brenda-7224d-default-rtdb.firebaseio.com",
    projectId: "twitch-brenda-7224d",
    storageBucket: "twitch-brenda-7224d.appspot.com",
    messagingSenderId: "946513713020",
    appId: "1:946513713020:web:0d57014b1e78ccb496b6f9",
    measurementId: "G-C7K2CPQQX9"
  };

  // Initialize Firebase
//   const app = initializeApp(firebaseConfig);

//   // Initialize Realtime Database and get a reference to the service
//   const database = getDatabase(app);

  return <div>Firebase</div>;
};
