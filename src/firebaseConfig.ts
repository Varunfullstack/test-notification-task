import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Initialize Firebase
const app = initializeApp({ projectId: "react-notify-1d5fe" });

// Initialize Firestore
const db = getFirestore(app);

// Connect to Firestore emulator in local development
connectFirestoreEmulator(db, "localhost", 8080);

export const firebase_db = db;
