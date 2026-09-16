import { useState, useEffect, useCallback } from "react";
import { TrendingMoviesRequest } from "../scripts/api/Movie";
import { TMDB_IMAGE_BASE_URL } from "../scripts/api";
import { CreateCard } from "./cards";
import useEmblaCarousel from "embla-carousel-react";

export function RecommendedMovies({ request = "week", title, index }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [currentType, setCurrentType] = useState("Movies");

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  let pullData = async () => {
    let data = await TrendingMoviesRequest(
      `${request}`,
      currentType === "Movies" ? "movie" : "tv",
    );
    setData(data);
  };

  useEffect(() => {
    try {
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
    const recommendedContainer = document.querySelector(
      `.${"recommended" + index}`,
    );

    const selectedType = e.textContent.split(" ").join("_");
    const typeBackground =
      recommendedContainer.querySelector(".type-background");
    const types = Array.from(recommendedContainer.querySelectorAll(".type"));

    setCurrentType(selectedType);
    types.forEach((type) => type.classList.remove("active"));
    e.classList.add("active");

    console.log(recommendedContainer);
    typeBackground.style.transform = `translateX(${typeSelector[selectedType]})`;
  };

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  if (loading) return <p>Loading...</p>;

  //////////////////
  console.log(currentType);
  ////////

  return (
    <section className={"recommended recommended" + index}>
      <div className="recommended-text">
        <div className="text-content">
          <h2>{title}</h2>
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
        <div className="embla-scroll">
          <div onClick={() => scrollPrev()} className="embla__prev">
            <i className="fa-solid fa-arrow-left"></i>
          </div>
          <div onClick={() => scrollNext()} className="embla__next">
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>
      <div className={"recommended-container"}>
        <div className="embla" ref={emblaRef}>
          <div className="embla__container movie-list-container">
            {data?.results?.length === 0 ? (
              <p>No Movies Found</p>
            ) : (
              data?.results?.map((movie) => (
                <div className="embla__slide" key={movie.id}>
                  <CreateCard movie={movie} />
                </div>
              ))
            )}
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
