// const playerUrl = "https://vidsrc.to/embed";
// const videoDataUrl = "https://www.imdb.com/api";
// const apiKey = "YOUR_API_KEY_HERE";

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
async function fetchAllMovies(page = 1) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`,
    );
    if (!response.ok) {
      throw new Error("Error fetching movies: " + response.statusText);
    }

    const data = await response.json();
    // Each movie object has an "id" field
    // const ids = data.results.map((movie) => movie.id);
    console.log(data);
    // console.log(ids);
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

// Example: fetch first page
fetchAllMovies(1);
