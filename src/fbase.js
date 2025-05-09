import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB3qV5Dys_ANH75eXpjTujG8b9LW9APi1w",
  authDomain: "handong-strategy-part-1.firebaseapp.com",
  projectId: "handong-strategy-part-1",
  storageBucket: "handong-strategy-part-1.appspot.com",
  messagingSenderId: "427469901890",
  appId: "1:427469901890:web:498fac97ecfcb319231ddb"
};


const app = initializeApp(firebaseConfig);
const dbService = getFirestore(app); 
const auth = getAuth(app);

export { app, dbService, auth };
