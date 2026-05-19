import { Button } from "bootstrap/dist/js/bootstrap.bundle.min";
import { TMDB_API_BASE_URL } from "../scripts/api";
import { TMDB_API_TOKEN } from "../scripts/api";
import { TMDB_API_KEY } from "../scripts/api";

// let genres = [];
export function WatchBtn() {
  return <button className="watch-btn">Watch Now</button>;
}

export function GenreBtn(genreIds) {
  const g = genreIds.genreId;
  console.log(g);
  let genres = getGanre();
  // console.log(genres);

  // const genreNames = g.map((id) => genres.find((genre) => genre === id)?.name);
  // remove undefined/null
  // console.log(genreNames);

  return;
  <>
    {genreNames.map((item) => (
      <Button>{item}</Button>
    ))}
  </>;
}

async function getGanre() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`,
    );

    if (!response.ok) {
      throw new error("NOT FOUND!");
    }

    const data = await response.json();
    // genres = data;
    // console.log(genres);
    return data;
  } catch {
    console.error(error);
  }
  return;
}
