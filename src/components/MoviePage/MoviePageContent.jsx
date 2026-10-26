import React, { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

// Styles Import
import "../../style/MoviePage/content.css";
import { movieData, TMDB_API_BASE_URL } from "../../scripts/api";
import { CreateCard, HD, ReleseDate } from "../cards";

// BASE
import { TMDB_IMAGE_BASE_URL } from "../../scripts/api";
import { preinit } from "react-dom";

import { SimilarMovies } from "../../scripts/api/Movie";

export function Content({ MovieData }) {
  const data = MovieData;
  console.log(data);

  return (
    <>
      <div className="movie-content-container">
        <div className="image-container">
          <img src={TMDB_IMAGE_BASE_URL + data.poster_path} alt="" />
        </div>

        <div className="main-movie-info">
          {" "}
          <div className="content">
            <h1 className="title">{data.title}</h1>
            <div className="essencial">
              <button className="trailer">
                <i class="fa-solid fa-play"></i>
                Trailer
              </button>
              <button className="imdb-btn">IMDB: {data.vote_average}</button>
              <HD />
            </div>
            <div className="movie-genres">
              <label htmlFor="genres">
                {data.genres.map((ele) => ele.name).join(", ")}
              </label>
            </div>

            <div className="description">{data.overview}</div>
          </div>
          <div className="movie-info">
            <div className="info-elements">
              <p name="relese">Relese: </p>
              <label htmlFor="relese">{data.release_date}</label>
            </div>
            <div className="info-elements">
              <p>Language: </p>
              <label htmlFor="">
                {" "}
                {data.spoken_languages.map((lang) => lang.name).join(", ")}
              </label>
            </div>
            <div className="info-elements">
              <p name="rating">rating: </p>
              <label htmlFor="rating">
                <span className="vote-avg">{data.vote_average.toFixed(1)}</span>
                <span className="vote-count">({data.vote_count})</span>
              </label>
            </div>
            <div className="info-elements">
              <p name="country">country: </p>
              <label htmlFor="country"> {data.origin_country[0]}</label>
            </div>

            <div className="info-elements">
              <p name="runtime">runtime: </p>
              <label htmlFor="runtime">{data.runtime} min</label>
            </div>
            <div className="info-elements">
              <p name="revenue">revenue: </p>
              <label htmlFor="revenue">{priceSpelling(data.revenue)}</label>
            </div>
            <div className="info-elements">
              <p name="budget">budget: </p>
              <label htmlFor="budget">{priceSpelling(data.budget)}</label>
            </div>
            <div className="info-elements">
              <p name="production_companies">production_companies: </p>
              {data.production_companies.map((ele) => ele.name).join(", ")}
              <label htmlFor="production_companies">{}</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function SimilarMoviesContainer({
  MovieData,
  page,
  title = "Similar Content",
}) {
  const [data, setData] = useState("N/A");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
  });
  useEffect(() => {
    const SimilarMovs = async () => {
      const dt = await SimilarMovies(MovieData.id, page);
      setData(dt);
    };
    SimilarMovs();
  }, []);

  //======Scroling=========>

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  //===============>
  // console.log(data);
  return (
    <>
      <div className="similar-movie-container">
        <div className="title-container">
          <h1 className="title">{title}</h1>
          <div className="embla-scroll">
            <div onClick={() => scrollPrev()} className="embla__prev">
              <i className="fa-solid fa-arrow-left"></i>
            </div>
            <div onClick={() => scrollNext()} className="embla__next">
              <i className="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        </div>
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {data.results?.map((el, index) => {
              return <CreateCard key={index} movie={el} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

// export function

function priceSpelling(price) {
  const Price = String(price);
  const len = Price.length - 1;
  let result = [];

  for (let letter = 0; letter <= len; letter++) {
    if (letter % 3 === 2 && Price.indexOf(Price[len - letter]) !== len) {
      result.unshift(`,${Price[len - letter]}`);
    } else {
      result.unshift(Price[len - letter]);
    }
  }

  let res = result.join("");
  let res_len = res.length;

  if (res[0] === ",") {
    res = res.slice(1, res_len);
  }

  return res;
}
