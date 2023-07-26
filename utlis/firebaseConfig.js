// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsy2ermaz2dJb5Ru0iHN3NZfdmxF6WqUc",
  authDomain: "group03-93732.firebaseapp.com",
  projectId: "group03-93732",
  storageBucket: "group03-93732.appspot.com",
  messagingSenderId: "38920129611",
  appId: "1:38920129611:web:f3769b9e2e7b2e6b4391ce",
  measurementId: "G-BVRKV168XZ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };