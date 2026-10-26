import { useState, useEffect, useRef } from "react";

// Components Import
import { CreateCard } from "../cards";
import { div, h1 } from "framer-motion/client";
import { AnimatePresence, motion } from "motion/react";
import { TMDB_API_KEY } from "@/scripts/api";

import "../../style/search/search.css";

// import { CreateCard } from "../cards";
export function SearchDisplay({ data }) {
  return <>{/* <sidebar className="search-display-block "></sidebar> */}</>;
}

const slides = [
  {
    title: "Mountain View",
    category: "NATURE / 01",
    description:
      "Discover peaceful mountain landscapes, where the sky meets the calm waters.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Forest Escape",
    category: "NATURE / 02",
    description:
      "Explore hidden forests and experience the beauty of the natural world.",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Ocean Breeze",
    category: "OCEAN / 03",
    description:
      "Let the ocean waves and endless horizon inspire your next adventure.",
    image:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Golden Sunset",
    category: "SUNSET / 04",
    description:
      "Watch golden sunlight transform the horizon into a beautiful painting.",
    image:
      "https://images.unsplash.com/photo-1472120435266-53107fd0c44a?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Night Sky",
    category: "SPACE / 05",
    description:
      "Find inspiration beneath the stars in the quiet of the night.",
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=85",
  },
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.94,
    rotateY: direction > 0 ? -8 : 8,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  },
  exit: (direction) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    scale: 0.94,
    rotateY: direction > 0 ? 8 : -8,
  }),
};

// export function GlassySlider() {
//   const [index, setIndex] = useState(0);
//   const [direction, setDirection] = useState(1);

//   const changeSlide = (newDirection) => {
//     setDirection(newDirection);

//     setIndex(
//       (current) => (current + newDirection + slides.length) % slides.length,
//     );
//   };

//   const slide = slides[index];

//   return <Carousel items={slide} />;
// }
export function Search() {
  const [data, setData] = useState([]);
  const keywords = useRef(null);
  const form = useRef(null);
  const pg = 1;

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const value = keywords.current.value;
      setData(value);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const updataSeassion = (e) => {
    sessionStorage.setItem("search_value", e.target.value);
  };
  useEffect(() => {
    keywords.current.value = sessionStorage.getItem("search_value");
    handleSubmit("");
  });

  return (
    <>
      <div className="search-wrapper fade-in-opacity w-full px-4 py-10">
        <form
          onSubmit={(e) => handleSubmit(e)}
          ref={form}
          className="search mx-auto flex w-full max-w-3xl items-center gap-2 rounded-xl border border-cyan-400/20 bg-white/5 p-2 shadow-lg shadow-cyan-500/5 backdrop-blur-md focus-within:border-cyan-400/60"
        >
          <input
            onChange={(e) => updataSeassion(e)}
            ref={keywords}
            type="search"
            placeholder="Search for a movie"
            className="w-full bg-transparent px-3 py-2 text-white placeholder-white/40 outline-none"
          />
          <button
            type="submit"
            className="rounded-lg rounded-2  bg-[#0f9070] px-5 py-2 font-medium text-slate-950 transition "
          >
            Search
          </button>
        </form>
      </div>
      <SearchMovies value={data} />
      <SearchMovies value={data} type="tv" />
    </>
  );
}

function SearchMovies({ value = "", type = "movie", pg = 1 }) {
  const [loading, setLoading] = useState(true);
  const [dt, setData] = useState("");
  const [page, setPage] = useState(pg);

  const loadData = async () => {
    try {
      value = sessionStorage.getItem("search_value");
      const response = await fetch(
        `https://api.themoviedb.org/3/search/${type}?api_key=${TMDB_API_KEY}&query=${value}&page=${page}`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      console.log(data);
      setData(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, [type, page, value]);

  useEffect(() => {
    setPage(1);
  }, [value]);

  function increasePage() {
    if (page + 1 > dt.total_pages) {
      return;
    }
    setPage(page + 1);
  }
  function decreasePage() {
    if (page - 1 < 1) {
      return;
    }
    setPage(page - 1);
  }

  if (dt.total_results < 1) {
    return (
      <>
        <h1 className="text-start my-5 text-white border-b-2 border-l-2 mx-2 rounded-2 w-fit relative z-2  px-3">
          {type === "tv" ? "TV" : type}
        </h1>
        <h1 className=" text-white relative z-2 min-h-100 flex justify-center  items-center">
          No Movies Found...
        </h1>
        ;
      </>
    );
  }
  if (loading) {
    return <h1 className="relative z-2 text-white">Loading...</h1>;
  }

  return (
    <>
      <h1 className="text-start my-5 text-white border-b-2 border-l-2 mx-2 rounded-2 w-fit relative z-2  px-3">
        {type === "tv" ? "TV" : type}
      </h1>

      <div className="bg-[rgba(30,30,30,0.6)] backdrop-blur-[5px] relative z-2 my-5 w-350 rounded-3 mx-auto  p-4">
        <div className="search-grid">
          {dt?.results?.map((ele) => (
            <div key={ele.id} className="min-h-[250px] max-w-50">
              <CreateCard movie={ele} type={type} />
            </div>
          ))}
        </div>
        <div className="load-more relative z-10 flex items-center justify-center gap-4 p-3 text-white">
          <button
            type="button"
            onClick={decreasePage}
            disabled={page <= 1}
            aria-label="Previous page"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-cyan-400/60 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>

          <span className="min-w-28 text-center text-sm text-white/70">
            Page {page} of {dt.total_pages}
          </span>

          <button
            type="button"
            onClick={increasePage}
            disabled={page >= dt.total_pages}
            aria-label="Next page"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:border-cyan-400/60 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white"
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export function SearchContainer() {
  return (
    <>
      <Search />
    </>
  );
}
