// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0MiZ0-HzPZfj8w8TW3d_1Ee5Sykp3vZo",
  authDomain: "blogposts-37806.firebaseapp.com",
  projectId: "blogposts-37806",
  storageBucket: "blogposts-37806.appspot.com",
  messagingSenderId: "285748973106",
  appId: "1:285748973106:web:20f131b4c69cecf133362b"
};

// Initialize Firebase
let firebaseApp;
if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig)
} else {
    firebaseApp = getApp()
    deleteApp(firebaseApp)
    firebaseApp = initializeApp(firebaseConfig)
}

export const db = getFirestore(firebaseApp)
export const auth = getAuth(firebaseApp)