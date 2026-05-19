import { TMDB_API_BASE_URL, TMDB_API_KEY } from "../api.js";
let randomMovies = [];
export async function HeroRandomMovies() {
  try {
    const response = await fetch(
      `${TMDB_API_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&page=1`,
    );
    if (!response.ok) {
      throw new Error("Error fetching movies: " + response.statusText);
    }
    const data = await response.json();

    randomMovies = Array.isArray(data.results) ? data.results.slice(0, 5) : [];
    return randomMovies;
  } catch (error) {
    console.error(`Error Fetching Hero Random Movies ${error}`);
    return [];
  }
}
