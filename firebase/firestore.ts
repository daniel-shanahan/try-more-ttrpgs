import { getFirestore } from "firebase/firestore";
import { app } from "./firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  Query,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import { Game } from "@/types/common.types";

export const db = getFirestore(app);

async function getGamesFromQuery(q: Query<DocumentData, DocumentData>) {
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { id: doc.id, data: doc.data() as Game };
  });
}

export async function getGamesToTry() {
  const gamesRef = collection(db, "games");
  const q = query(gamesRef, where("played", "==", false), orderBy("name"));
  return await getGamesFromQuery(q);
}

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
  return await getGamesFromQuery(q);
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
  return await getGamesFromQuery(q);
}

export async function getGamesPlayed() {
  const gamesRef = collection(db, "games");
  const gamesWithDate = await getGamesPlayedWithDate(gamesRef);
  const gamesWithoutDate = await getGamesPlayedWithoutDate(gamesRef);
  return [...gamesWithDate, ...gamesWithoutDate];
}
