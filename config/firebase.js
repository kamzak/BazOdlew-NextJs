// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import "firebase/storage";
import "firebase/compat/storage";
import 'firebase/compat/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0_wLEm0kTPqpecoGo0nIxW-rpV-Xt_xU",
  authDomain: "bazodlew.firebaseapp.com",
  databaseURL: "https://bazodlew-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bazodlew",
  storageBucket: "bazodlew.appspot.com",
  messagingSenderId: "935744604931",
  appId: "1:935744604931:web:d144f49ff664198d77f736",
  measurementId: "G-4XHB6GSEVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();    
export const database = getDatabase();
export const storage = getStorage();