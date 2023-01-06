// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firebaseApiKey } from "./firebase.key";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain: "thrift-4b4c3.firebaseapp.com",
  projectId: "thrift-4b4c3",
  storageBucket: "thrift-4b4c3.appspot.com",
  messagingSenderId: "398163657707",
  appId: "1:398163657707:web:caf29d1f2de4627849cfae"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);