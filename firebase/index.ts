// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const env = import.meta.env;

const APIKEY = env.VITE_FIREBASE_API_KEY;
const AUTH_DOMAIN = env.VITE_FIREBASE_AUTH_DOMAIN;
const PROJECT_ID = env.VITE_FIREBASE_PROJECT_ID;
const STORAGE_BUCKET = env.VITE_FIREBASE_STORAGE_BUCKET;
const MESSAGING_SENDER_ID = env.VITE_FIREBASE_MESSAGING_SENDER_ID;
const APP_ID = env.VITE_FIREBASE_APP_ID;
const MEASUREMENT_ID = env.VITE_FIREBASE_MEASUREMENT_ID;

const missingKeys = [
  APIKEY ? null : "VITE_FIREBASE_API_KEY",
  AUTH_DOMAIN ? null : "VITE_FIREBASE_AUTH_DOMAIN",
  PROJECT_ID ? null : "VITE_FIREBASE_PROJECT_ID",
  STORAGE_BUCKET ? null : "VITE_FIREBASE_STORAGE_BUCKET",
  MESSAGING_SENDER_ID ? null : "VITE_FIREBASE_MESSAGING_SENDER_ID",
  APP_ID ? null : "VITE_FIREBASE_APP_ID",
].filter(Boolean);

if (missingKeys.length > 0) {
  throw new Error(
    `Missing Firebase env vars: ${missingKeys.join(", ")}. ` +
      "In Vite, client env vars must be prefixed with VITE_.",
  );
}

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
const db = getFirestore(app);

let cachedAuth: Auth | null = null;

const isBrowser = () => typeof window !== "undefined";

const getClientAuth = (): Auth => {
  if (!isBrowser()) {
    throw new Error("Firebase Auth is client-only and cannot be used during SSR.");
  }
  if (cachedAuth) return cachedAuth;
  cachedAuth = getAuth(app);
  return cachedAuth;
};

export { app, db, getClientAuth };