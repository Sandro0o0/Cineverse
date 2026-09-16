import React from "react";
import { RandomMovies } from "../scripts/api/Movie";
import { useState, useEffect } from "react";
import { DisplayUserName } from "./messages";
import { CreateCard } from "./cards";

export function CardCircle({ src = "" }) {
  const [data, setData] = useState("");
  const cardSection = React.useRef(null);
  const cardCircleContainer = React.useRef([]);
  const [originalTransform, setOriginalTransform] = useState(""); // holds the saved value

  const [hovered, setHovered] = useState(false);

  //  Data Fetching
  useEffect(() => {
    const pullRandomMovies = async () => {
      const response = await RandomMovies(5, "popular");
      setData(response);
    };
    pullRandomMovies();
  }, []);

  // Animating Start/Pause Logic
  // ---------->
  useEffect(() => {
    const animSection = cardSection.current.animate(
      [
        { rotate: originalTransform }, // 0%
        { rotate: "360deg" }, // 100%
      ],
      {
        duration: 25000,
        iterations: Infinity,
        easing: "linear",
      },
    );
    const animCard = cardCircleContainer.current.map((card) =>
      card.animate([{ rotate: "0deg" }, { rotate: "-360deg" }], {
        duration: 25000,
        iterations: Infinity,
        easing: "linear",
      }),
    );

    cardCircleContainer.current = [];

    cardSection?.current.addEventListener("mouseover", (e) => {
      setOriginalTransform(getComputedStyle(cardSection.current).rotate);
      if (!e.target.closest(".card-circle-card-container")) {
        //
        setHovered(false);
        animSection.play();
        animCard.forEach((card) => card.play());
      }
    });

    window.addEventListener("mouseover", (e) => {
      setOriginalTransform(getComputedStyle(cardSection.current).rotate);
      if (e.target.closest(".card-circle-card-container")) {
        //
        animSection.pause();
        animCard.forEach((card) => card.pause());
        setHovered(true);
      }
    });
  }, [data]);

  return (
    <>
      <section className="card-circle-section">
        <DisplayUserName text="Never Judge Movie By The Cover Put Your Mind To It And Discover..." />
        <div className="card-circle" ref={cardSection}>
          {data?.results?.slice(0, 6).map((movie, index) => (
            <CreateCard
              key={index}
              movie={movie}
              classname={`card-circle-card-container  circle-card-${index}`}
              ref={(el) => (cardCircleContainer.current[index] = el)}
            />
          ))}
          {/* <div className="card-circle-card-container circle-card-0"></div>
          <div className="card-circle-card-container circle-card-1"></div>
          <div className="card-circle-card-container circle-card-2"></div>
          <div className="card-circle-card-container circle-card-3"></div>
          <div className="card-circle-card-container circle-card-4"></div>
          <div className="card-circle-card-container circle-card-5"></div> */}
        </div>
      </section>
    </>
  );
}
