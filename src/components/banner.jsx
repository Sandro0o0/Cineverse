import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { PopularMovies } from "../scripts/api/Movie";
import { CreateCard } from "./cards";

export function BannerSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true, // natural dragging feel
    containScroll: "trimSnaps",
    // loop: true,         // uncomment if you want infinite loop
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      const getPopularMovies = async () => {
        const Movies = await PopularMovies();
        setData(Movies);
      };
      getPopularMovies();
      console.log(data);
    } catch (err) {
      console.error(err);
    } finally {
    }
  }, []);

  return (
    <div className="banner-section">
      <div className="banner-cover"></div>
      <div className="banner-header">
        <h1>Popular Movies</h1>
      </div>
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
  );
}
