import { useState, useEffect } from "react";
import { TrendingMoviesRequest } from "../scripts/api/Movie";
import { TMDB_IMAGE_BASE_URL } from "../scripts/api";
import { CreateCard } from "./cards";
import useEmblaCarousel from "embla-carousel-react";

export function RecommendedMovies() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [currentType, setCurrentType] = useState();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true, // natural dragging feel
    containScroll: "trimSnaps",
    // loop: true,         // uncomment if you want infinite loop
  });

  // Drag Logic

  useEffect(() => {
    try {
      let pullData = async () => {
        let data = await TrendingMoviesRequest();
        setData(data);
      };
      pullData();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleType = (e) => {
    const typeSelector = {
      Movies: "0px",
      TV_Series: "100%",
    };
    const selectedType = e.textContent.split(" ").join("_");
    const typeBackground = document.querySelector(".type-background");
    const types = Array.from(document.querySelectorAll(".type"));

    setCurrentType(selectedType);
    types.forEach((type) => type.classList.remove("active"));
    e.classList.add("active");

    typeBackground.style.transform = `translateX(${typeSelector[selectedType]})`;
  };

  if (loading) return <p>Loading...</p>;

  return (
    <section className="recommended ">
      <div className="recommended-text">
        <h2>Trending</h2>
        <div className="type-category">
          <span className="type-background"></span>
          <div
            onClick={(e) => {
              handleType(e.target);
            }}
            className="type active"
          >
            Movies
          </div>
          <div
            onClick={(e) => {
              handleType(e.target);
            }}
            className="type"
          >
            TV Series
          </div>
        </div>
      </div>
      <div className="recommended-container">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container movie-list-container">
            {data?.results?.map((movie) => (
              <div className="embla__slide" key={movie.id}>
                <CreateCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function getCurrentTranslateX(element) {
  console.log(element);
  const style = window.getComputedStyle(element);
  const matrix = style.transform || style.webkitTransform;

  if (matrix === "none") return 0;

  const values = matrix.match(/matrix.*\((.+)\)/)[1].split(", ");
  return parseFloat(values[4]) || 0; // translateX is the 5th value (index 4)
}
