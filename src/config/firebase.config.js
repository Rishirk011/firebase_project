// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDneT7gN8OH5QcIwY7t4-svRDCsRnq0mG8",
  authDomain: "fir-practice-664e6.firebaseapp.com",
  projectId: "fir-practice-664e6",
  storageBucket: "fir-practice-664e6.firebasestorage.app",
  messagingSenderId: "884672243049",
  appId: "1:884672243049:web:0fdc76605fbd8a1dcbc9f8",
  measurementId: "G-XPF823RX8K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
