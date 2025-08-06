// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDl0YEgAXGAvm7pe1_oVaF4ofd46BHprHA",
  authDomain: "caption-generator-u0tug.firebaseapp.com",
  projectId: "caption-generator-u0tug",
  storageBucket: "caption-generator-u0tug.appspot.com",
  messagingSenderId: "606923864100",
  appId: "1:606923864100:web:9b7f11250582b0e631c0b1",
  measurementId: "G-XXXXXXXXXX"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
