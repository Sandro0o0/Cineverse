// App.jsx

import { useEffect, useState } from "react";
import { DisplayUserName } from "./components/messages.jsx"; // curly braces for named export
import { Header, Hero } from "./components/layout.jsx";
import { RecommendedMovies } from "./components/recomended.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // <-- add this line
import {
  initScrollAnimation,
  bellAnimation,
  drawCanvas,
} from "./scripts/animations.js";

function App() {
  useEffect(() => {
    initScrollAnimation();
    bellAnimation();
    drawCanvas();
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <RecommendedMovies />
    </>
  );
}

export default App;
