// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDFaveuhveIz8eO9z_pKgwZ0-Y1Gt4PO6s",
  authDomain: "twitch-brenda-7224d.firebaseapp.com",
  databaseURL: "https://twitch-brenda-7224d-default-rtdb.firebaseio.com",
  projectId: "twitch-brenda-7224d",
  storageBucket: "twitch-brenda-7224d.appspot.com",
  messagingSenderId: "946513713020",
  appId: "1:946513713020:web:0d57014b1e78ccb496b6f9",
  measurementId: "G-C7K2CPQQX9",
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
