// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS9k9MV2z1aDGMJew6Njc_2f0VfgCdX14",
  authDomain: "learning-management-d0043.firebaseapp.com",
  projectId: "learning-management-d0043",
  storageBucket: "learning-management-d0043.firebasestorage.app",
  messagingSenderId: "1014988517050",
  appId: "1:1014988517050:web:b408d2c58466eef3461c83",
  measurementId: "G-16WBXKY3MB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics only works in the browser
export const analytics = (await isSupported()) ? getAnalytics(app) : null;