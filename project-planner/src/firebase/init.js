import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBFpiERKcGBV4vdkvBIyO6TnBy6Rfmg7XU",
  authDomain: "react-project-planner-3b62f.firebaseapp.com",
  projectId: "react-project-planner-3b62f",
  storageBucket: "react-project-planner-3b62f.appspot.com",
  messagingSenderId: "291754482037",
  appId: "1:291754482037:web:89fa1b4f343c8865b15b3c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };