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
import { div } from "framer-motion/client";

export function Content({ MovieData }) {
  const data = MovieData;

  return (
    <div className="p-5">
      <div className="flex w-full max-w-[1280px] rounded-5 mx-auto flex-col gap-6 p-5 bg-400/50  border-1 border-grey backdrop-blur-[5px] text-white sm:p-6 lg:flex-row lg:items-start lg:gap-8 lg:p-8">
        {/* Poster */}
        <div className="image-container mx-auto w-full max-w-[280px] shrink-0 sm:max-w-[320px] lg:mx-0 lg:w-[280px]">
          <img
            src={TMDB_IMAGE_BASE_URL + data?.poster_path}
            alt={data?.title || "Movie poster"}
            className="h-auto w-full rounded-lg object-cover shadow-lg"
          />
        </div>

        {/* Movie details */}
        <div className="main-movie-info flex min-w-0 flex-1 flex-col gap-6">
          <div className="content flex flex-col gap-4">
            <h1 className="title text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
              {data?.title}
            </h1>

            <div className="essencial flex flex-wrap items-center gap-3">
              <button className="trailer inline-flex items-center gap-2 rounded-md bg-red-700 px-4 py-2 text-sm font-semibold transition-colors hover:bg-red-600">
                <i className="fa-solid fa-play" />
                Trailer
              </button>

              <button className="imdb-btn rounded-md border border-white/20 bg-[#222] px-4 py-2 text-sm font-semibold hover:bg-[#333]">
                IMDB: {data?.vote_average}
              </button>

              <HD />
            </div>

            <div className="movie-genres text-sm text-gray-400">
              {data?.genres?.map((ele) => ele.name).join(", ")}
            </div>

            <div className="description text-sm leading-7 text-gray-300 sm:text-base">
              {data?.overview}
            </div>
          </div>

          {/* Additional information */}
          <div className="movie-info grid grid-cols-1 gap-x-8 gap-y-4 border-t border-white/10 pt-5 sm:grid-cols-2 xl:grid-cols-3">
            <div className="info-elements flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase text-gray-500">
                Release:
              </p>
              <span className="break-words text-sm">
                {data?.release_date || data?.first_air_date || "Unknown"}
              </span>
            </div>

            <div className="info-elements flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase text-gray-500">
                Language
              </p>
              <span className="break-words text-sm">
                {data?.spoken_languages?.map((lang) => lang.name).join(", ") ||
                  "Unknown"}
              </span>
            </div>

            <div className="info-elements flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase text-gray-500">
                Rating
              </p>
              <span className="text-sm">
                <span className="vote-avg font-semibold text-yellow-400">
                  {data?.vote_average?.toFixed(1)}
                </span>{" "}
                <span className="vote-count text-gray-500">
                  ({data?.vote_count})
                </span>
              </span>
            </div>

            <div className="info-elements flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase text-gray-500">
                Country
              </p>
              <span className="text-sm">
                {data?.origin_country?.[0] || "Unknown"}
              </span>
            </div>

            <div className="info-elements flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase text-gray-500">
                Runtime
              </p>
              <span className="text-sm">
                {data?.runtime != null ? `${data.runtime} min` : "Unknown"}
              </span>
            </div>

            <div className="info-elements flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase text-gray-500">
                Revenue
              </p>
              <span className="break-words text-sm">
                {priceSpelling(data?.revenue)}
              </span>
            </div>

            <div className="info-elements flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase text-gray-500">
                Budget
              </p>
              <span className="break-words text-sm">
                {priceSpelling(data?.budget)}
              </span>
            </div>

            <div className="info-elements flex flex-col gap-1 sm:col-span-2 xl:col-span-3">
              <p className="text-xs font-semibold uppercase text-gray-500">
                Production companies
              </p>
              <span className="break-words text-sm leading-6 text-gray-300">
                {data?.production_companies
                  ?.map((ele) => ele.name)
                  .join(", ") || "Unknown"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
