// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const APIKEY = process.env.FIREBASE_API_KEY;
const AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN;
const PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
const STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET;
const MESSAGING_SENDER_ID = process.env.FIREBASE_MESSAGING_SENDER_ID;
const APP_ID = process.env.FIREBASE_APP_ID;
const MEASUREMENT_ID = process.env.FIREBASE_MEASUREMENT_ID;

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };