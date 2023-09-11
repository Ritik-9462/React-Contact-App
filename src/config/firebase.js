// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjvE2b_xdPv12l2bYR7Z35_pWk3EbWH3Q",
  authDomain: "vite-contacts-6ab15.firebaseapp.com",
  projectId: "vite-contacts-6ab15",
  storageBucket: "vite-contacts-6ab15.appspot.com",
  messagingSenderId: "815796385412",
  appId: "1:815796385412:web:3bd453ae93166cfabd74d1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);