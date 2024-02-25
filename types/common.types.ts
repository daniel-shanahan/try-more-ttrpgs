export type Genre = "Fantasy" | "Sci-Fi" | "Horror" | "Superhero" | "Modern";

export type Crunch = "High" | "Medium" | "Low";

export type Game = {
  name: string;
  description: string;
  imageUrl: string;
  crunch: Crunch;
  genre: Genre;
  gmRequired: boolean;
  played: boolean;
  playedDate: string;
  thoughts: string;
};
