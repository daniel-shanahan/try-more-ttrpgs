"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Crunch, Genre, Game } from "@/types/common.types";
import { db } from "@/firebase/firebase";
import { collection, addDoc } from "firebase/firestore/lite";

export default function AddGameForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [played, setPlayed] = useState(false);
  const [playedDate, setPlayedDate] = useState("");
  const [genre, setGenre] = useState<Genre | "">("");
  const [crunch, setCrunch] = useState<Crunch | "">("");
  const [gmRequired, setGmRequired] = useState<boolean | "">("");

  const router = useRouter();

  const add = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (genre === "") return alert("Please select a genre");
    if (crunch === "") return alert("Please select a crunchiness");
    if (gmRequired === "") return alert("Please select if a GM is required");

    const game: Game = {
      name,
      description,
      imageUrl,
      played,
      playedDate,
      genre,
      crunch,
      gmRequired,
    };

    console.log(game);
    await addDoc(collection(db, "games"), game);

    setName("");
    setDescription("");
    setImageUrl("");
    setPlayed(false);
    setGenre("");
    setCrunch("");
    setGmRequired("");
    setPlayedDate("");

    router.refresh();
  };

  return (
    <form
      onSubmit={add}
      className="flex flex-col gap-4 container w-1/2 mx-auto border-2 border-black p-4"
    >
      <h1>Add Game</h1>
      <label>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full"
        />
      </label>
      <label>
        Description
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="block w-full"
        />
      </label>
      <label>
        Image URL
        <input
          type="url"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="block w-full"
        />
      </label>
      <div className="flex justify-between">
        <label>
          Played
          <select
            name="played"
            value={played.toString()}
            onChange={(e) =>
              e.target.value === "true" ? setPlayed(true) : setPlayed(false)
            }
            className="block"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </label>
        <label>
          Played Date
          <input
            type="date"
            name="playedDate"
            value={playedDate}
            onChange={(e) => setPlayedDate(e.target.value)}
            className="block"
            disabled={!played}
          />
        </label>
      </div>
      <div className="flex justify-between">
        <fieldset className="flex flex-col">
          <legend>Genre</legend>
          <label>
            <input
              type="radio"
              name="genre"
              checked={genre === "Fantasy"}
              onChange={(e) => setGenre("Fantasy")}
              required
            />
            Fantasy
          </label>
          <label>
            <input
              type="radio"
              name="genre"
              checked={genre === "Sci-Fi"}
              onChange={(e) => setGenre("Sci-Fi")}
            />
            Sci-Fi
          </label>
          <label>
            <input
              type="radio"
              name="genre"
              checked={genre === "Horror"}
              onChange={(e) => setGenre("Horror")}
            />
            Horror
          </label>
          <label>
            <input
              type="radio"
              name="genre"
              checked={genre === "Superhero"}
              onChange={(e) => setGenre("Superhero")}
            />
            Superhero
          </label>
          <label>
            <input
              type="radio"
              name="genre"
              checked={genre === "Modern"}
              onChange={(e) => setGenre("Modern")}
            />
            Modern
          </label>
        </fieldset>
        <fieldset className="flex flex-col">
          <legend>Crunch</legend>
          <label>
            <input
              type="radio"
              name="crunch"
              checked={crunch === "High"}
              onChange={(e) => setCrunch("High")}
              required
            />
            High
          </label>
          <label>
            <input
              type="radio"
              name="crunch"
              checked={crunch === "Medium"}
              onChange={(e) => setCrunch("Medium")}
            />
            Medium
          </label>
          <label>
            <input
              type="radio"
              name="crunch"
              checked={crunch === "Low"}
              onChange={(e) => setCrunch("Low")}
            />
            Low
          </label>
        </fieldset>
        <fieldset className="flex flex-col">
          <legend>GM Required</legend>
          <label>
            <input
              type="radio"
              name="gmRequired"
              checked={gmRequired === true}
              onChange={(e) => setGmRequired(true)}
              required
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="gmRequired"
              checked={gmRequired === false}
              onChange={(e) => setGmRequired(false)}
            />
            No
          </label>
        </fieldset>
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-emerald-100 font-semibold rounded-full shadow-md hover:shadow-lg transition motion-reduce:transition-none"
      >
        Add Game
      </button>
    </form>
  );
}
