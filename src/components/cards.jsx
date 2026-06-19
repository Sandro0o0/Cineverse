import { GenreBtn } from "./buttons";
import { TMDB_IMAGE_BASE_URL } from "../scripts/api";

export function CreateCard(Movie) {
  const movieData = Movie.movie; // Obj
  console.log(movieData);

  return (
    <div className="card-container">
      <img src={TMDB_IMAGE_BASE_URL + movieData.poster_path} alt="" />
      <div className="essencials">
        <HD />
        <ReleseDate date={movieData.release_date} />
        <GenreBtn genreId={movieData.genre_Ids} />
      </div>
      <i class="fa-solid fa-circle-play play-icon"></i>
      <div className="content">
        <div className="title">{movieData.title}</div>
      </div>
    </div>
  );
}

function TmdbHd() {
  return (
    <div className="hd-container">
      <p>TMDB</p>
      <span>HD</span>
    </div>
  );
}

function HD() {
  return <span className="HD">HD</span>;
}

function ReleseDate(data) {
  const movieDate = data.date.split("-")[0];
  return <div className="date">{movieDate}</div>;
}
