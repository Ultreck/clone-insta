// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCvydMWRc8ACtYWHmhrMu2emvr9EmmZZhA",
  authDomain: "adming-panel-c0d51.firebaseapp.com",
  projectId: "adming-panel-c0d51",
  storageBucket: "adming-panel-c0d51.firebasestorage.app",
  messagingSenderId: "1087891109119",
  appId: "1:1087891109119:web:6d235e37283fea88e788ca",
  measurementId: "G-YN0EE2BK7N"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
