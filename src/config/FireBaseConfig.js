import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD4MTes4cfF7Z8fG0VWTEURgjub4eVT0cY",
  authDomain: "carmanaager-upload-file.firebaseapp.com",
  projectId: "carmanaager-upload-file",
  storageBucket: "carmanaager-upload-file.appspot.com",
  messagingSenderId: "446393418311",
  appId: "1:446393418311:web:b6c833ab0ba7ef5ee8e762",
  measurementId: "G-TWKVWPFJ85"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);