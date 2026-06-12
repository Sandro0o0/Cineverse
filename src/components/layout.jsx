import { useEffect, useState } from "react";
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
          <li className="nav-item dropdown ">
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
  const directionValues = {
    left: -1,
    right: 1,
  };

  const [count, setCount] = useState(0);

  const handleSlide = (direction) => {
    setCount((prevCount) => {
      let newCount = prevCount;
      const previewElements = Array.from(
        document.querySelectorAll(".preview-img"),
      );

      if (direction === "right") {
        if (prevCount >= randomMovies.length - 1) return prevCount; // prevent going too far
        newCount += 1;
        sliding("right", previewElements, newCount, count);
      } else if (direction === "left") {
        if (prevCount <= 0) return prevCount;
        newCount -= 1;
        sliding("left", previewElements, newCount, count);
      }

      return newCount;
    });
  };

  useEffect(() => {
    const bgImg = document.getElementById("hero-bc-img");
    if (bgImg && randomMovies[count]) {
      bgImg.src = `${TMDB_IMAGE_BASE_URL}${randomMovies[count].backdrop_path}`;
    }
  }, [count]);

  useEffect(() => {
    const previewElements = Array.from(
      document.querySelectorAll(".preview-img"),
    );
    const elementSize = previewElements[0]?.getBoundingClientRect();

    if (!elementSize) return;

    let scaleCoefficient = 0.1;
    let baseGap = 70;
    const baseHeightCoefficient = 80;

    for (let i = 0; i < previewElements.length; i++) {
      const element = document.querySelector(`.preview-${i}`);
      const parent = element.parentElement;

      parent.style.setProperty(
        "height",
        `${baseHeightCoefficient - 10 * i}%`,
        "important",
      );
      parent.style.transform = `translateX(-${baseGap * i}px)`;
      parent.style.zIndex = `${previewElements.length - i}`;

      baseGap += 13;
      scaleCoefficient += 0.1;
    }
  }, []);

  return (
    <>
      <div className="hero">
        <div className="arrow arrow-left" onClick={() => handleSlide("left")}>
          <i
            onClick={(e) => e.stopPropagation()}
            className="fa-solid fa-left-long"
          ></i>
        </div>
        <div id="hero-content" className="hero-content">
          <div className="hero-item">
            <img
              id="hero-bc-img"
              src={`${TMDB_IMAGE_BASE_URL}${randomMovies[0]?.backdrop_path}`}
              alt="Not Found!"
            />
            <div className="item-content">
              <div className="content">
                <h1>{randomMovies[count]?.title}</h1>

                <p>{randomMovies[count]?.overview.slice(0, 300)}..</p>
                <div className="genres">
                  <GenreBtn genreId={randomMovies[count]?.genre_ids}></GenreBtn>
                </div>
                <WatchBtn></WatchBtn>
              </div>
              <div className="preview-banners">
                <div className="preview-overlay">
                  <div className="overlay-1"></div>
                  <div className="overlay-2"></div>
                  <div className="overlay-3"></div>
                </div>
                {randomMovies.map((element, index) => {
                  return (
                    <div key={index} className="img-container">
                      <div className="img-overlay"></div>
                      <img
                        className={`preview-img preview-${index}`}
                        src={`${TMDB_IMAGE_BASE_URL}${element?.backdrop_path}`}
                        alt="Not Found!"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="arrow arrow-right" onClick={() => handleSlide("right")}>
          <i
            onClick={(e) => e.stopPropagation()}
            className="fa-solid fa-right-long"
          ></i>
        </div>
        <div className="hero-cover"></div>
      </div>
      <DisplayText text="Welcome To Cineverse"></DisplayText>
    </>
  );
}

function sliding(direction, previewElements, newCount, count) {
  let baseGap = 70;
  const imageWidth = previewElements[0].getBoundingClientRect().width;
  if (direction === "left") {
    previewElements.forEach((img, index) => {
      const element = img;
      const parent = element.parentElement.parentElement;

      const parentRect = parent.getBoundingClientRect();
      const childRect = element.getBoundingClientRect();

      const baseHeightCoefficient = 80;
      const relLeft = Math.round(childRect.left - parentRect.left);
      const shiftedIndex = index - newCount;
      console.log(imageWidth);

      element.parentElement.style.transform = `translateX(-${imageWidth * newCount + 3 * index + baseGap * shiftedIndex}px)`;
      element.parentElement.style.setProperty(
        "height",
        `${baseHeightCoefficient - 10 * shiftedIndex}%`,
        "important",
      );
      if (index === newCount) element.parentElement.style.opacity = `1`;

      // element.parentElement.style.opacity = `1`;

      baseGap += 13;
    });
  } else {
    previewElements.forEach((img, index) => {
      const element = img;
      const parent = element.parentElement.parentElement;

      const parentRect = parent.getBoundingClientRect();
      const childRect = element.getBoundingClientRect();

      const baseHeightCoefficient = 80;
      const relLeft = Math.round(childRect.left - parentRect.left);
      const shiftedIndex = index - newCount;

      element.parentElement.style.transform = `translateX(${-childRect.width * newCount - 3 * index - baseGap * shiftedIndex * 2}px)`;
      element.parentElement.style.setProperty(
        "height",
        `${baseHeightCoefficient - 10 * shiftedIndex}%`,
        "important",
      );
      if (index === count) element.parentElement.style.opacity = `0`;

      baseGap -= 13;
    });
  }
}
