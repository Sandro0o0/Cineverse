import React from "react";

import { useEffect, useState } from "react";
import { DisplayUserName } from "../messages.jsx"; // curly braces for named export
import { Header, Hero } from "../layout.jsx";
import { RecommendedMovies } from "../recomended.jsx";
import { BannerSection } from "../banner.jsx";
import { CardCircle } from "../card-cyrcle.jsx";

// For Movie Fetching
import { PullMovie } from "../../scripts/api/Movie.js";

// Page Imports
import { Player } from "../MoviePage/player.jsx";

import {
  initScrollAnimation,
  bellAnimation,
  drawCanvas,
} from "../../scripts/animations.js";

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

  const FetchedMovieData = async (id) => {
    const data = await PullMovie(id);
    console.log(data);
    return data;
  };

  return (
    <>
      <Player MovieData={() => FetchedMovieData(MovieId)}></Player>
      <Header></Header>
    </>
  );
}
