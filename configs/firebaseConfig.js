// Import the functions you need from the SDKs you need
// "use client"
import { initializeApp } from "firebase/app";
import { doc,collection,getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAoczBL46r7zevoArMXtipXKBT54U90jRE",
  authDomain: "lehenga-f337e.firebaseapp.com",
  projectId: "lehenga-f337e",
  storageBucket: "lehenga-f337e.appspot.com",
  messagingSenderId: "120951247855",
  appId: "1:120951247855:web:d463cef8e55a4973f2dc1a"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);
export {db}