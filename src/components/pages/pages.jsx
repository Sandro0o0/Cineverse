import React from "react";

import { useEffect, useState } from "react";
import { DisplayUserName } from "../messages.jsx"; // curly braces for named export
import { Header, Hero } from "../layout.jsx";
import { RecommendedMovies } from "../recomended.jsx";
import { BannerSection } from "../banner.jsx";
import { CardCircle } from "../card-cyrcle.jsx";

// For Movie Fetching
import { MoviesRequestID, PullMovie } from "../../scripts/api/Movie.js";

// Page Imports
import { Player } from "../MoviePage/player.jsx";

// Animations Import
import {
  initScrollAnimation,
  bellAnimation,
  drawCanvas,
} from "../../scripts/animations.js";

// Styles Import
import "../../style/MoviePage/content.css";

export function Index() {
  useEffect(() => {
    initScrollAnimation();
    bellAnimation();
    drawCanvas();
  }, []);

  return (
    <>
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

  if (loading) return <p className="LOADING">Loading...</p>;

  return (
    <>
      <Header></Header>
      <main className="movie-page-container">
        <Player MovieData={movieData}></Player>
      </main>
    </>
  );
}
