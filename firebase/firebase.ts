import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7wsQaQ9lQzEAHvsVMuHUqNyshJj1zGAA",
  authDomain: "try-more-ttrpgs.firebaseapp.com",
  projectId: "try-more-ttrpgs",
  storageBucket: "try-more-ttrpgs.appspot.com",
  messagingSenderId: "406508966474",
  appId: "1:406508966474:web:9559a4a73a1664a45f0cb3",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
