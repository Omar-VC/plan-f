// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqeR6L5kffOjKwG4p3t0crf6E43QTZrmk",
  authDomain: "plan-f-f3a76.firebaseapp.com",
  projectId: "plan-f-f3a76",
  storageBucket: "plan-f-f3a76.firebasestorage.app",
  messagingSenderId: "770699068370",
  appId: "1:770699068370:web:354877a03b623f52b13e0b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
