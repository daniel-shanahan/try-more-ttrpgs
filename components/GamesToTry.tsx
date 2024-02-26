import {
  collection,
  getDocs,
  Firestore,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Game } from "@/types/common.types";
import GamesSection from "./GamesSection";

async function getGamesToTry(db: Firestore) {
  const gamesRef = collection(db, "games");
  const q = query(gamesRef, where("played", "==", false), orderBy("name"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { id: doc.id, data: doc.data() as Game };
  });
}

export default async function GamesToTry() {
  const gamesToTry = await getGamesToTry(db);

  return <GamesSection title="Games to try" games={gamesToTry} />;
}
