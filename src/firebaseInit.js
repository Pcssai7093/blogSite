import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8zmxkrVOQASNo3GrOgkr0M2YpnLirfcw",
  authDomain: "blogapp-81127.firebaseapp.com",
  projectId: "blogapp-81127",
  storageBucket: "blogapp-81127.firebasestorage.app",
  messagingSenderId: "115255025425",
  appId: "1:115255025425:web:504535798c62a1b95ab6b0",
  measurementId: "G-M1051GH37G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
