import {
  movieData,
  TMDB_API_BASE_URL,
  TMDB_API_KEY,
  TMDB_API_TOKEN,
  category,
} from "../api.js";

const urlPullMovies = "https://api.themoviedb.org/3/movie/changes?page=3";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TMDB_API_TOKEN}`,
  },
};
// window.addEventListener("message", (event) => {
//   if (event.origin !== "https://vidlink.pro") return;
//   if (localStorage.getItem("vidLinkProgress")) return;
//   if (event.data?.type === "MEDIA_DATA") {
//     const mediaData = event.data.data;
//     localStorage.setItem("vidLinkProgress", JSON.stringify(mediaData));
//   }
// });

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

export async function TrendingMoviesRequest(time_window, type = "movie") {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/${type}/${time_window}`,
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

export async function PullMovie(id) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}`,
      options,
    );

    if (!response.ok) {
      throw new Error("Error: ", response.status);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
export async function PullSeries(id) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}`,
    );
    const season = await res.json();
    return season;
  } catch (err) {
    console.error(err);
  }
}
export async function PullEpisodes(id, seasonNumber) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${TMDB_API_KEY}`,
    );
    const episodes = await res.json();
    return episodes;
  } catch (err) {
    console.error(err);
  }
}

export async function PopularMovies() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated`,
      options,
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}
export async function SimilarMovies(id, page = 1) {
  //api.themoviedb.org/3/movie/550/similar?api_key=YOUR_API_KEY&language=en-US&page=1
  https: try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`,
      options,
    );
    const data = await response.json();

    return data;
  } catch (err) {
    console.error(err);
  }
}

PopularMovies();

export async function RandomMovies(count, cat = "popular") {
  try {
    let randomNum = Math.floor(Math.random() * count) + 1;
    const response = await fetch(category[cat] + `&page=${randomNum}`, options);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
}
// PullMovie(255);
