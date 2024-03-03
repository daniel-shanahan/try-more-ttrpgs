"use client";

import { Game, Genre, Crunch } from "@/types/common.types";
import { useState } from "react";
import GameCard from "./GameCard";

interface GamePickerProps {
  games: { id: string; data: Game }[];
}

type GameFilters = {
  genre: Genre | null;
  crunch: Crunch | null;
  gmRequired: boolean | null;
};

const initialFilters: GameFilters = {
  genre: null,
  crunch: null,
  gmRequired: null,
};

export default function GamePicker({ games }: GamePickerProps) {
  const [gameToTry, setGameToTry] = useState<{ id: string; data: Game } | null>(
    null
  );
  const [submitted, setSubmitted] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const filterSelected = Object.values(filters).some((value) => value !== null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filteredGames = games.filter((game) => {
      if (filters.genre && game.data.genre !== filters.genre) {
        return false;
      }
      if (filters.crunch && game.data.crunch !== filters.crunch) {
        return false;
      }
      if (
        filters.gmRequired !== null &&
        game.data.gmRequired !== filters.gmRequired
      ) {
        return false;
      }
      return true;
    });

    setGameToTry(
      filteredGames[Math.floor(Math.random() * filteredGames.length)]
    );
    setSubmitted(true);
  };

  return (
    <section className="py-12 md:flex md:justify-between">
      <div className="flex flex-wrap">
        <div className="lg:w-1/2">
          <h1 className="text-4xl mb-8">The next game I'll play is...</h1>
          <form onSubmit={handleSubmit}>
            <fieldset className="flex flex-col w-1/3">
              <legend className="text-xs text-gray-500 tracking-wide font-medium uppercase mb-2">
                Genre
              </legend>
              <label>
                <input
                  type="radio"
                  name="genre"
                  checked={filters.genre === "Fantasy"}
                  value="Fantasy"
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Fantasy
              </label>
              <label>
                <input
                  type="radio"
                  name="genre"
                  checked={filters.genre === "Sci-Fi"}
                  value="Sci-Fi"
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Sci-Fi
              </label>
              <label>
                <input
                  type="radio"
                  name="genre"
                  checked={filters.genre === "Horror"}
                  value="Horror"
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Horror
              </label>
              <label>
                <input
                  type="radio"
                  name="genre"
                  checked={filters.genre === "Superhero"}
                  value="Superhero"
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Superhero
              </label>
              <label>
                <input
                  type="radio"
                  name="genre"
                  checked={filters.genre === "Modern"}
                  value="Modern"
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Modern
              </label>
            </fieldset>
            <fieldset className="flex flex-col w-1/3">
              <legend className="text-xs text-gray-500 tracking-wide font-medium uppercase mb-2">
                Crunch
              </legend>
              <label>
                <input
                  type="radio"
                  name="crunch"
                  checked={filters.crunch === "High"}
                  value="High"
                  onChange={handleInputChange}
                  className="mr-2"
                />
                High
              </label>
              <label>
                <input
                  type="radio"
                  name="crunch"
                  checked={filters.crunch === "Medium"}
                  value="Medium"
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Medium
              </label>
              <label>
                <input
                  type="radio"
                  name="crunch"
                  checked={filters.crunch === "Low"}
                  value="Low"
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Low
              </label>
            </fieldset>
            <fieldset className="flex flex-col w-1/3">
              <legend className="text-xs text-gray-500 tracking-wide font-medium uppercase mb-2">
                GM Required
              </legend>
              <label>
                <input
                  type="radio"
                  name="gmRequired"
                  checked={filters.gmRequired === true}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, gmRequired: true }))
                  }
                  className="mr-2"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="gmRequired"
                  checked={filters.gmRequired === false}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, gmRequired: false }))
                  }
                  className="mr-2"
                />
                No
              </label>
            </fieldset>
            <div className="flex gap-4 items-center mt-6">
              <button
                type="submit"
                className="rounded-lg bg-emerald-500 text-emerald-100 font-semibold shadow px-4 py-2 hover:shadow-xl hover:bg-emerald-600 transition motion-reduce:transition-none"
              >
                Roll the dice!
              </button>
              {filterSelected && (
                <button
                  type="button"
                  onClick={() => setFilters(initialFilters)}
                  className="rounded-full text-gray-500 hover:text-gray-400 transition motion-reduce:transition-none px-3 py-2"
                >
                  Clear filters
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="lg:w-1/2">
          {submitted && gameToTry ? (
            <GameCard id={gameToTry.id} game={gameToTry.data} />
          ) : (
            <div className="h-full flex justify-center items-center rounded-lg bg-gray-200 text-gray-700">
              <p>Sorry, nothing matched those tags!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
