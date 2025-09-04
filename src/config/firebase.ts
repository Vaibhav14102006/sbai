// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBayTAMuS8N-edF9yoI9G0RoChp3bNjzlI",
  authDomain: "goodsinminutes.firebaseapp.com",
  projectId: "goodsinminutes",
  storageBucket: "goodsinminutes.firebasestorage.app",
  messagingSenderId: "701827935261",
  appId: "1:701827935261:web:da6a4a52514065661daaf4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
