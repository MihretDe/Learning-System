// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAS9k9MV2z1aDGMJew6Njc_2f0VfgCdX14",
  authDomain:"learning-management-d0043.firebaseapp.com",
  projectId: "learning-management-d0043",
    storageBucket: "learning-management-d0043.appspot.com",  // ✅ fixed here

  messagingSenderId: "1014988517050",
 appId: "1:1014988517050:web:b408d2c58466eef3461c83",
  measurementId: "G-16WBXKY3MB"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
