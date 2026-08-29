// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHGG3V3d1kvnVVZQyHcEp6AtQWqsBVgQA",
  authDomain: "rac-kitengela.firebaseapp.com",
  projectId: "rac-kitengela",
  storageBucket: "rac-kitengela.firebasestorage.app",
  messagingSenderId: "785602631075",
  appId: "1:785602631075:web:6d689ad7fd3f0c7c5b3616",
  measurementId: "G-NQD6DV4KT7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
