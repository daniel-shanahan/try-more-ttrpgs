import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  Firestore,
} from "firebase/firestore/lite";
import Image from "next/image";

const firebaseConfig = {
  apiKey: "AIzaSyB7wsQaQ9lQzEAHvsVMuHUqNyshJj1zGAA",
  authDomain: "try-more-ttrpgs.firebaseapp.com",
  projectId: "try-more-ttrpgs",
  storageBucket: "try-more-ttrpgs.appspot.com",
  messagingSenderId: "406508966474",
  appId: "1:406508966474:web:9559a4a73a1664a45f0cb3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home() {
  async function getGames(db: Firestore) {
    const gamesCol = collection(db, "games");
    const gamesSnapshot = await getDocs(gamesCol);
    const gamesList = gamesSnapshot.docs.map((doc) => doc.data());
    console.log(gamesList);
    return gamesList;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <h1 className="text-4xl">Games</h1>
        <div className="grid grid-cols-4 gap-4 mt-8">
          {getGames(db).then((games) => {
            return games.map((game) => {
              return (
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src={game.imageUrl}
                    alt={game.name}
                    width={150}
                    height={100}
                  />
                  <h2 className="text-xl font-bold">{game.name}</h2>
                  <p className="">{game.description}</p>
                </div>
              );
            });
          })}
        </div>
      </section>
    </main>
  );
}
