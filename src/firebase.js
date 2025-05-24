// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyOI6UOObWMUtxBVQT8d7K5-NIJEG2IYM",
  authDomain: "code-canvas-blog-websi.firebaseapp.com",
  projectId: "code-canvas-blog-websi",
  appId: "1:239948733961:web:469157a04173426f0f62d8",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
