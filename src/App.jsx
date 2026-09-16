// App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages
import { Index, MoviePage } from "./components/pages/pages.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // <-- add this line

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/movies" search="?id=:id" element={<MoviePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
