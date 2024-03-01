import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB7wsQaQ9lQzEAHvsVMuHUqNyshJj1zGAA",
  authDomain: "try-more-ttrpgs.firebaseapp.com",
  projectId: "try-more-ttrpgs",
  storageBucket: "try-more-ttrpgs.appspot.com",
  messagingSenderId: "406508966474",
  appId: "1:406508966474:web:9559a4a73a1664a45f0cb3",
};

export const app = initializeApp(firebaseConfig);
