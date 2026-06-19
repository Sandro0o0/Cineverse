import {
  movieData,
  TMDB_API_BASE_URL,
  TMDB_API_KEY,
  TMDB_API_TOKEN,
} from "../api.js";

const urlPullMovies = "https://api.themoviedb.org/3/movie/changes?page=3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_TOKEN}`,
  },
};

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

export async function MoviesRequestID() {
  const request = await fetch(urlPullMovies, options);
  const data = await request.json();

  console.log(data);
  const MovieId = data.results;
  // console.log(MovieId);
  return MovieId;
}

export async function TrendingMoviesRequest() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week`,
      options,
    );
    if (!response.ok) {
      throw new Error(`Error handling data ${error}`);
    }
    let movies = response.json();

    return movies;
  } catch (error) {
    console.error(error);
  }
}
TrendingMoviesRequest();
