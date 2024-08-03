// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCoV4f4hlDs8q8jpWiBYB-Qfp_l4FSsyQw",
  authDomain: "react-notify-1d5fe.firebaseapp.com",
  projectId: "react-notify-1d5fe",
  storageBucket: "react-notify-1d5fe.appspot.com",
  messagingSenderId: "941198286065",
  appId: "1:941198286065:web:15ed89d8ba1bed36f19d50",
  measurementId: "G-BLN73CZ7S0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebase_db = getFirestore(app);
