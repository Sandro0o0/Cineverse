// App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import { Index, MoviePage, Movie, TvPage } from "./components/pages/pages.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // <-- add this line
// import { TvPage } from "../src/components/pages/pages.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/movies" search="?id=:id" element={<MoviePage />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/tv" search="?id=:id" element={<TvPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
