// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfNMfMLVlBXBM-x3pLLQuIjt-9NeCgjX4",
  authDomain: "amiquiz-1d46b.firebaseapp.com",
  projectId: "amiquiz-1d46b",
  storageBucket: "amiquiz-1d46b.firebasestorage.app",
  messagingSenderId: "870862298839",
  appId: "1:870862298839:web:139f41f53519a0cfd8da92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
