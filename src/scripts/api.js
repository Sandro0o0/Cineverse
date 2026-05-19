//  prrequire("dotenv").config();

export const TMDB_API_KEY = "1058545e480a9af6c7fd6cedb6ca4e57";
export const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDU4NTQ1ZTQ4MGE5YWY2YzdmZDZjZWRiNmNhNGU1NyIsIm5iZiI6MTc3ODgzOTI0NC4wNTc5OTk4LCJzdWIiOiI2YTA2ZWVjY2U2MzRmNDYxNWYzZDllZTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.TEDCb8_NhoKV-i8ajsN5-L5BzYrU2sy3YGrHZTYtSGc";
export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

async function fetchVideoData(videoId) {
  try {
    const response = await fetch(`${playerUrl}/${videoId}`);
    if (!response.ok) {
      throw new Error("Error fetching video data: " + response.statusText);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching video data:", error);
  }
}

async function fetchVideoDetails(videoId) {
  try {
    const response = await fetch(`${videoDataUrl}?id=${videoId}`);
    if (!response.ok) {
      throw new Error("Error fetching video details: " + response.statusText);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching video details:", error);
  }
}

async function fetchAllMovies(page = 56) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&page=${page}`,
    );
    if (!response.ok) {
      throw new Error("Error fetching movies: " + response.statusText);
    }

    const data = await response.json();
    // Each movie object has an "id" field
    // const ids = data.results.map((movie) => movie.id);
    // console.log(data);
    // console.log(ids);
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

// Example: fetch first page
export let movieData = fetchAllMovies();
