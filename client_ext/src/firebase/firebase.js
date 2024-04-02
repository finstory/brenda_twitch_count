// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAh1pbwatsCv-kZGGtlXQc30xYamYTjnJc",
  authDomain: "twitch-97653.firebaseapp.com",
  databaseURL: "https://twitch-97653-default-rtdb.firebaseio.com",
  projectId: "twitch-97653",
  storageBucket: "twitch-97653.appspot.com",
  messagingSenderId: "525461178518",
  appId: "1:525461178518:web:53a39243d904ba3b6bdab7"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
