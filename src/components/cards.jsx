import { GenreBtn } from "./buttons";
import { TMDB_IMAGE_BASE_URL } from "../scripts/api";
import { forwardRef } from "react";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

export const CreateCard = forwardRef(function CreateCard(
  { movie, classname = "" },
  ref,
) {
  const movieData = movie;

  // Movie Page relocate
  function Relocate(id) {
    window.location.href = `/movies/?id=${id}`;
  }
  // useEffect(() => {}, [movieData]);

  return (
    <div ref={ref} className={`card-container ${classname}`}>
      <img src={TMDB_IMAGE_BASE_URL + movieData.poster_path} alt="" />
      <div className="essencials">
        <HD />
        <ReleseDate date={movieData.release_date} />
        <GenreBtn genreId={movieData.genre_Ids} />
      </div>
      <a
        onClick={() => Relocate(movieData.id)}
        // href="./templates/movie/"
        target=""
        rel="noopener noreferrer"
      >
        <i className="fa-solid fa-circle-play play-icon"></i>
      </a>
      <div className="content">
        <div className="title">{movieData.title}</div>
      </div>
    </div>
  );
});

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
