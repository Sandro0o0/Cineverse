import React from "react";

import { useEffect, useState } from "react";
import { Header, Hero } from "../layout.jsx";
import { RecommendedMovies } from "../recomended.jsx";
import { BannerSection } from "../banner.jsx";
import { CardCircle } from "../card-cyrcle.jsx";
import { PageNavigation } from "../MoviePage/player.jsx";
import {
  CanvasBackground,
  LinearBackground,
  LucidShowCase,
  GlitchMotion,
} from "../../features/background.jsx";
// import { GlassySlider } from "../search/search.jsx";
import { Search } from "../search/search.jsx";

import TechText from "../TechText.jsx";
// For Movie Fetching
import { MoviesRequestID, PullMovie } from "../../scripts/api/Movie.js";
// import { PullSeries } from "../../scripts/api/Movie.js";

// Page Imports
import { Player } from "../MoviePage/player.jsx";
import {
  Content,
  SimilarMoviesContainer,
} from "../MoviePage/MoviePageContent.jsx";

// Animations Import
import {
  initScrollAnimation,
  bellAnimation,
  drawCanvas,
} from "../../scripts/animations.js";

// Styles Import
import "../../style/MoviePage/content.css";

import { TMDB_IMAGE_BASE_URL } from "../../scripts/api.js";

import { UNSAFE_DataRouterContext } from "react-router-dom";
import { SearchDisplay } from "../search/search.jsx";
import { SearchContainer } from "../search/search.jsx";
import { header } from "framer-motion/client";
import { Tv } from "../TvPage/tv.jsx";

export function Index() {
  useEffect(() => {
    initScrollAnimation();
    bellAnimation();
    drawCanvas();
  }, []);

  return (
    <>
      <LinearBackground />
      <CanvasBackground />
      <Header />
      <Hero />
      <RecommendedMovies
        title={"Tranding This Week"}
        request={"week"}
        index={1}
      />
      <RecommendedMovies
        title={"Tranding This Day"}
        request={"day"}
        index={2}
      />
      <BannerSection />
      <CardCircle />
    </>
  );
}
export function MoviePage() {
  const url = new URLSearchParams(window.location.search);
  const MovieId = url.get("id");
  useEffect(() => {
    window.window.scrollTo({
      top: 100,
      behavior: "smooth",
    });
  }, []);

  const [movieData, setMovieData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!MovieId) return;

    const FetchedMovieData = async (id) => {
      const data = await PullMovie(id);
      setMovieData(data);
      setLoading(false);
    };

    FetchedMovieData(MovieId);
  }, [MovieId]);

  if (loading)
    return (
      <>
        <div className="loader-container">
          <div className="LOADING"></div>;
        </div>
      </>
    );

  return (
    <>
      <LinearBackground />

      <Header></Header>

      <PageNavigation MovieData={movieData} />
      <main className="movie-page-container">
        <img
          className="player-img"
          src={TMDB_IMAGE_BASE_URL + movieData.backdrop_path}
          alt=""
        />
        <div className="player-img-cover"></div>

        <Player MovieData={movieData}></Player>
      </main>
      <Content MovieData={movieData} />
      <SimilarMoviesContainer MovieData={movieData} />
      <SimilarMoviesContainer MovieData={movieData} page={2} title={""} />
    </>
  );
}

export function TvPage() {
  const url = new URLSearchParams(window.location.search);
  const [data, setData] = useState(null);

  const seriesId = url.get("id");

  //
  // console.log(seriesId);
  const loadData = async () => {
    const dt = await PullSeries(seriesId);
    setData(dt);
    return data;
  };
  loadData();
  return (
    <>
      <LinearBackground />
      {/* <Header></Header> */}
      <Tv />;
    </>
  );
}

export function Movie() {
  const url = new URLSearchParams(window.location.search);
  const [loading, setLoading] = useState(true);

  return (
    <>
      <LinearBackground />
      <CanvasBackground />
      <Header />
      <div style={{ width: "100%", height: "480px", position: "relative" }}>
        <TechText
          text="Search"
          fontWeight={600}
          fontSize={150}
          reveal="letter"
          dashLength={4}
          dashGap={2}
          specks={15}
          intro="none"
          introDuration={2}
          clickKick
          guides={false}
          fontFamily=""
          letterSpacing={-0.05}
          accentColor="currentColor"
          reach={200}
          softness={0.7}
          lineStyle="dashed"
          strokeWidth={1.5}
          speed={1}
          bounce={0.4}
          selection
          labels
          color="#fff"
          align="center"
          draggable
          sweep
        />
      </div>
      <SearchContainer />
      {/* <Search /> */}
      {/* <GlitchMotion /> */}
      {/* <SearchDisplay /> */}
    </>
  );
}
