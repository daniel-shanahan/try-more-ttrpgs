import {
  collection,
  getDocs,
  Firestore,
  query,
  where,
  orderBy,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { Game } from "@/types/common.types";
import GamesSection from "./GamesSection";

async function getGamesPlayedWithDate(
  gamesRef: CollectionReference<DocumentData, DocumentData>
) {
  const q = query(
    gamesRef,
    where("played", "==", true),
    where("playedDate", "!=", ""),
    orderBy("playedDate", "desc"),
    orderBy("name")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { id: doc.id, data: doc.data() as Game };
  });
}

async function getGamesPlayedWithoutDate(
  gamesRef: CollectionReference<DocumentData, DocumentData>
) {
  const q = query(
    gamesRef,
    where("played", "==", true),
    where("playedDate", "==", ""),
    orderBy("name")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { id: doc.id, data: doc.data() as Game };
  });
}

async function getGamesPlayed(db: Firestore) {
  const gamesRef = collection(db, "games");
  const gamesWithDate = await getGamesPlayedWithDate(gamesRef);
  const gamesWithoutDate = await getGamesPlayedWithoutDate(gamesRef);
  return [...gamesWithDate, ...gamesWithoutDate];
}

export default async function GamesToTry() {
  const gamesPlayed = await getGamesPlayed(db);

  return <GamesSection title="Games I've played" games={gamesPlayed} />;
}
