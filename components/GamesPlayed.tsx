import {
  collection,
  getDocs,
  Firestore,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Game } from "@/types/common.types";
import GamesSection from "./GamesSection";

async function getGamesPlayed(db: Firestore) {
  const gamesRef = collection(db, "games");
  const q = query(gamesRef, where("played", "==", true));
  const querySnapshot = await getDocs(q);
  const gamesList = querySnapshot.docs.map((doc) => doc.data()) as Game[];
  return gamesList;
}

export default async function GamesToTry() {
  const gamesPlayed = await getGamesPlayed(db);

  return <GamesSection title="Games I've played" games={gamesPlayed} />;
}
