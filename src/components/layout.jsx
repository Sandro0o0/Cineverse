import { use, useEffect, useState } from "react";
import { SearchBar } from "./search";
import { movieData, TMDB_IMAGE_BASE_URL } from "../scripts/api";
import { HeroRandomMovies } from "../scripts/api/Movie.js";
import { DisplayText } from "./texts.jsx";
import { WatchBtn, GenreBtn } from "./buttons.jsx";

const randomMovies = await HeroRandomMovies();
console.log(randomMovies);

export function Header() {
  return (
    <div className="header-container">
      <nav className="navbar">
        <h1 className="logo-text">CINEVERSE</h1>
        <ul className="list-group list-group-horizontal">
          <li className="hover-text-effect active">
            Home
            <div className="underline"></div>
          </li>

          <li className="hover-text-effect">
            Movies
            <div className="underline"></div>
          </li>
          <li className="hover-text-effect">
            Series
            <div className="underline"></div>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Horror
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Comedy
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Sci-Fi
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
            </ul>
          </li>
          {""}
          <li className="hover-text-effect">
            Watchlist
            <div className="underline"></div>
          </li>
        </ul>
      </nav>
      <div className="services">
        <SearchBar></SearchBar>
        <i className="fas fa-bell"></i>
        <span className="account">
          <i className="fas fa-user "></i>
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  let [movieIndex, setMovieIndex] = useState(0);

  return (
    <>
      <div className="hero">
        <div className="arrow arrow-left">&#8592;</div>
        <div id="hero-content" className="hero-content">
          <div className="hero-item">
            <img
              src={`${TMDB_IMAGE_BASE_URL}${randomMovies[0]?.backdrop_path}`}
              alt="Not Found!"
            />
            <div className="item-content">
              <h1>{randomMovies[0]?.original_title}</h1>
              <div className="genres">
                <GenreBtn genreId={randomMovies[0]?.genre_ids}></GenreBtn>
              </div>

              <WatchBtn></WatchBtn>
            </div>
          </div>
        </div>

        <div className="arrow arrow-right">&#8594;</div>
        <div className="hero-cover"></div>
      </div>
      <DisplayText text="Welcome To Cineverse"></DisplayText>
    </>
  );
}
