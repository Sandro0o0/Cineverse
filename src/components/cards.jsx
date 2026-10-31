import { GenreBtn } from "./buttons";
import { TMDB_IMAGE_BASE_URL } from "../scripts/api";
import { forwardRef, useRef, useState } from "react";
import { useEffect } from "react";
import FadeContent from "./FadeContent";

// import { useNavigate } from "react-router-dom";

export const CreateCard = forwardRef(function CreateCard(
  { movie, classname = "", type = "movie" },
  ref,
) {
  const card = useRef(null);
  const movieData = movie;
  const [visible, setVisible] = useState(false);
  console.log(movie);

  useEffect(() => {
    const handleScroll = () => {
      const element = card.current;

      if (!element) return;

      const offset = element.offsetTop;

      if (window.scrollY >= offset) {
        element.classList.add("fade-in-opacity");
      }
    };

    window.addEventListener("scroll", handleScroll);

    // handleScroll(); // Check immediately

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // animate only once
        }
      },
      { threshold: 0.2 }, // fires when 20% of the element is visible
    );
    observer.observe(card.current);
    return () => observer.disconnect();
  }, []);

  function Relocate(id) {
    const types = {
      movie: `movies/?id=${id}`,
      tv: `tv/?id=${id}&season=1&ep=1`,
    };
    window.location.href = types[type];
  }

  return (
    <div ref={card} className={`card-container ${classname}`}>
      <img
        src={TMDB_IMAGE_BASE_URL + movieData?.poster_path}
        alt="Image NOT FOUND!"
      />
      <div className="essencials">
        <HD />
        <ReleseDate
          date={movieData?.release_date || movieData?.first_air_date}
        />
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
      <div className="content fade-in-opacity">
        <div className="title">{movieData?.title || movieData?.name}</div>
      </div>
    </div>
  );
});

function TmdbHd() {
  return (
    <div className="hd-container ">
      <p>TMDB</p>
      <span>HD</span>
    </div>
  );
}

export function HD() {
  return <span className="HD">HD</span>;
}

export function ReleseDate(data) {
  const movieDate = data?.date?.split("-")[0];
  return <div className="date">{movieDate}</div>;
}
