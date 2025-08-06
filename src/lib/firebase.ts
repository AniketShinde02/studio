// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "caption-generator-u0tug",
  appId: "1:606923864100:web:9b7f11250582b0e631c0b1",
  storageBucket: "caption-generator-u0tug.firebasestorage.app",
  apiKey: "AIzaSyDl0YEgAXGAvm7pe1_oVaF4ofd46BHprHA",
  authDomain: "caption-generator-u0tug.firebaseapp.com",
  messagingSenderId: "606923864100",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);