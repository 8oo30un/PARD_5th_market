import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCN8i-b_oqpq3RKsBx9FY4-Nzn_Jg0Eo9M",
  authDomain: "pardmarket-ba84c.firebaseapp.com",
  projectId: "pardmarket-ba84c",
  storageBucket: "pardmarket-ba84c.firebasestorage.app",
  messagingSenderId: "633989652088",
  appId: "1:633989652088:web:b7af79cbf3c764668b978d",
  measurementId: "G-GKHXM7701W",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const dbService = getFirestore(app);
const auth = getAuth(app);

export { app, dbService, auth };
