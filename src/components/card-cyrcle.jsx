import React from "react";
import { RandomMovies } from "../scripts/api/Movie";
import { useState, useEffect } from "react";
import { DisplayUserName } from "./messages";
import { CreateCard } from "./cards";

import OrbitImages from "./OrbitImages";
import { TMDB_IMAGE_BASE_URL } from "@/scripts/api";
import { link } from "framer-motion/client";
import { useNavigate } from "react-router-dom";

export function CardCircle({ src = "" }) {
  const [data, setData] = useState([]);
  const [links, setlinks] = useState({});
  const navigate = useNavigate();

  //  Data Fetching
  const pullRandomMovies = async () => {
    const response = await RandomMovies(60, "popular");
    let linkArray = {};

    const result = response?.results?.map((ele, index) => {
      linkArray[index] = ele;
      return TMDB_IMAGE_BASE_URL + ele.poster_path;
    });
    setlinks(linkArray);
    setData(result);
  };
  useEffect(() => {
    pullRandomMovies();
  }, []);
  console.log(links);

  return (
    <>
      <OrbitImages
        onItemClick={(e) => navigate(`/movies?id=${links[e].id}`)}
        images={data}
        shape="ellipse"
        radiusX={340}
        radiusY={100}
        rotation={-4}
        duration={15}
        itemSize={100}
        depth={0.9}
        showPath
        centerContent={
          <h2 className="text-white">
            <button onClick={() => pullRandomMovies()}>
              Random Experiance
            </button>
          </h2>
        }
        radius={110}
        itemRadius={20}
        shadow={0.5}
        hoverScale={1.08}
        hoverSpeed={0.3}
        pathDash={0}
        direction="normal"
        easing="linear"
        fill
        alignToPath={false}
        draggable
        clickToFront
        paused={false}
        intro
      />
    </>
  );
}
