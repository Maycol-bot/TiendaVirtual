import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBZI-k1g-rbxJnHAcML2cJt-TVr3aHAcqo",
  authDomain: "tiendaneo-virtual.firebaseapp.com",
  projectId: "tiendaneo-virtual",
  storageBucket: "tiendaneo-virtual.firebasestorage.app",
  messagingSenderId: "122253871383",
  appId: "1:122253871383:web:e51d64beb550ee9b984f52",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);