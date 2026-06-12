import { useEffect, useState } from "react";
import { Button } from "bootstrap/dist/js/bootstrap.bundle.min";
import { TMDB_API_BASE_URL } from "../scripts/api";
import { TMDB_API_TOKEN } from "../scripts/api";
import { TMDB_API_KEY } from "../scripts/api";

// let genres = [];
export function WatchBtn() {
  return <button className="watch-btn">Watch Now</button>;
}

export function GenreBtn({ genreId = [] }) {
  const [genreNames, setGenreNames] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadGenres() {
      if (!genreId?.length) {
        setGenreNames([]);
        return;
      }

      const data = await getGenre();
      if (!active || !data?.genres) return;

      const names = genreId
        .map((id) => data.genres.find((genre) => genre.id === id)?.name)
        .filter(Boolean);

      setGenreNames(names);
    }

    loadGenres();

    return () => {
      active = false;
    };
  }, [genreId]);

  return (
    <>
      {genreNames.map((item) => (
        <button key={item} className="genre-btn">
          {item}
        </button>
      ))}
    </>
  );
}

async function getGenre() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`,
    );

    if (!response.ok) {
      throw new Error("NOT FOUND!");
    }

    const data = await response.json();
    // genres = data;
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
  return;
}
