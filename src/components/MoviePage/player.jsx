import React, { useEffect, useRef, useState } from "react";
import {
  movieData,
  TMDB_API_KEY,
  TMDB_IMAGE_BASE_URL,
} from "../../scripts/api";
import "../../style/main.css";

// Styles
import "../../style/MoviePage/player.css";
import { p } from "framer-motion/client";
import TechText from "../TechText";

// General Player Data
const MoviePlayers = {
  VidLink: (id) => `https://vidlink.pro/movie/${id}`,
  MovieWeb: (id) => `https://movie-web.app/movie/${id}`,
  Embed2: (id) => `https://www.2embed.cc/embed/${id}`,
  SuperEmbed: (id) => `https://superembed.stream/movie/${id}`,
  Cataz: (id) => `https://cataz.to/movie/${id}`,
  FlixHQ: (id) => `https://flixhq.to/movie/${id}`,
  Videasy: (id) => `https://player.videasy.net/movie/${id}?autoplay=true`,
  VidCore: (id) => `https://vidcore.org/embed/movie/${id}?autoplay=true`,
  VidSrc: (id) => `https://vidsrc.xyz/embed/movie/${id}`,
  VidSrcTo: (id) => `https://vidsrc.to/embed/movie/${id}`,
  AutoEmbed: (id) => `https://autoembed.co/movie/tmdb/${id}`,
  EmbedAPI: (id) => `https://watch.embed-api.stream/embed/movie/${id}`,
  VidSrcAPI: (id) => `https://vidsrcapi.com/embed/movie/${id}`,
};
const MovieKeys = Object.keys(MoviePlayers);
//========================================================>

export function Player({ MovieData }) {
  const [currentServer, setCurrentServer] = useState(MoviePlayers.VidLink(""));
  const serverList = Array.from(document.querySelectorAll(".server-list"));
  const [playerLoad, setPlayerLoad] = useState(false); // Boolean

  const iframeRef = useRef(null);

  function handleStars() {
    const rating = MovieData.vote_average / 2; // MovieData.vote_average / 2

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const result = [];

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      result.push(<i key={`full-${i}`} className="fa-solid fa-star"></i>);
    }

    // Half star
    if (hasHalfStar) {
      result.push(<i key="half" className="fa-solid fa-star-half-stroke"></i>);
    }

    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      result.push(<i key={`empty-${i}`} className="fa-regular fa-star"></i>);
    }

    return result;
  }
  // IFrameVolume Control
  const handleLoad = () => {
    try {
      iframeRef.current.contentWindow.postMessage(
        {
          type: "setVolume",
          volume: 0.7,
        },
        "*",
      );
    } catch (e) {
      console.warn("Cannot access iframe content (likely cross-origin):", e);
    }
  };

  // fontColoring and onload
  useEffect(() => {
    serverList.forEach((e, index) => {
      e.style.color = getGradientColor(index, serverList.length);
    });
    if (!currentServer.includes("vidlink")) return;

    setCurrentServer(MoviePlayers.VidLink(MovieData.id));
  }, [currentServer]);

  // getGenreNames();
  // useEffect(() => {}, []);
  if (!playerLoad) {
    return (
      <>
        <div className="fade-in-opacity flex flex-col gap-3">
          <div className="player-placeholder rounded-2xl overflow-hidden relative bg-green-600 mt-5">
            <img
              className="absolute w-full object-cover min-h-full"
              src={TMDB_IMAGE_BASE_URL + MovieData.backdrop_path}
              alt=""
            />
            <div className="image-cover absolute opacity-[0.7] w-full h-full bg-[#000]"></div>

            <div className="content-wrapper min-h-[80vh] flex flex-row justify-between items-end">
              <div className="content relative w-fit flex text-[#fff] flex-col gap-2 justify-end items-start p-5">
                <div className="relative flex justify-start p-0 m-0 h-20 w-100 border-b-2">
                  <TechText
                    text={MovieData.title}
                    fontWeight={600}
                    fontSize={150}
                    reveal="letter"
                    dashLength={4}
                    dashGap={2}
                    specks={15}
                    intro="none"
                    introDuration={2}
                    clickKick
                    guides={false}
                    fontFamily=""
                    letterSpacing={-0.05}
                    accentColor="currentColor"
                    reach={200}
                    softness={0.7}
                    lineStyle="dashed"
                    strokeWidth={1.5}
                    speed={1}
                    bounce={0.4}
                    selection
                    labels
                    color="#fff"
                    align="center"
                    draggable
                    sweep
                  />
                </div>

                <div className="genres flex items-center text-nowrap min-w-[300px]">
                  {MovieData?.genres?.map((ele, index) => {
                    return (
                      <>
                        <p className="m-0 text-sm text-[#fff] w-[min-content]">
                          {ele.name}
                        </p>
                        <span className="w-1 h-1 rounded-[50%] opacity-[0.5] bg-green-100"></span>
                      </>
                    );
                  })}
                </div>
                <div className="rating flex  flex-row gap-2 items-center text-[#CB904D]">
                  <div className="stars">{handleStars()}</div>
                  <span className="w-1 h-1 rounded-[50%] opacity-[0.5] bg-green-100"></span>
                  <p className="m-0">({MovieData.vote_average.toFixed(1)})</p>
                </div>
                <p className="max-w-[70%] text-[#fff] opacity-[0.8] ">
                  {MovieData.overview.split(" ").slice(0, 50).join(" ")}
                </p>
              </div>
              <div className="relative play-icon w-[50%] min-h-[50vh] flex justify-center items-center ">
                <i
                  onClick={() => setPlayerLoad(true)}
                  className="fa-solid fa-play text-xl cursor-pointer bg-white p-2 px-3 rounded-5 border-2 "
                ></i>{" "}
              </div>
            </div>
          </div>
          <p className="server-recommend-message">
            if the player doesn't work try another
          </p>
          <PlayerServerContainer
            data={MovieData}
            server={setCurrentServer}
            ServerNames={MovieKeys}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="player-container fade-in-opacity">
        <iframe
          src={currentServer}
          frameBorder="0"
          lazyLoading="true"
          allowFullScreen
          ref={iframeRef}
          onLoad={handleLoad}
        ></iframe>
        <p className="server-recommend-message">
          if the player doesn't work try another
        </p>
        <PlayerServerContainer
          data={MovieData}
          server={setCurrentServer}
          ServerNames={MovieKeys}
        />
      </div>
    </>
  );
}

export function PlayerServerContainer({ ServerNames, server, data }) {
  return (
    <>
      <div className="player-server-container fade-in">
        {ServerNames.map((name, index) => {
          return (
            <Server serv={server} dt={data} key={index} serverName={name} />
          );
        })}
      </div>
    </>
  );
}

export function Server({ serverName, dt, serv }) {
  // ServerName is already mapped retuned value = str
  const serverList = Array.from(document.querySelectorAll(".server-list"));

  return (
    <>
      <div
        onClick={(e) => {
          removeActive(serverList);
          e.currentTarget.classList.add("active");
          serv(MoviePlayers[serverName](dt.id));
        }}
        className={"server-list"}
      >
        <i class="fa-solid fa-play"></i>
        {serverName}
      </div>
    </>
  );
}

export function PageNavigation({ MovieData }) {
  // (category, type, moviename);
  const data = MovieData;
  const category = data.genres[0].name; // Category name  exemp: Horror
  const title = data.title;
  // console.log(data);

  return (
    <>
      <div className="movie-page-navigation">
        <h2 className="nav-links">
          <a href="/">Home</a>
        </h2>
        <span>/</span>
        <h5 className="nav-links">{category}</h5>
        <span>/</span>
        <p className="nav-links">{title}</p>
      </div>
    </>
  );
}

//===========================================

function removeActive(lst) {
  lst.forEach((ele) => ele.classList.remove("active"));
}

function getGradientColor(index, total) {
  const hue = (index / total) * 360; // spread across full color wheel
  return `hsl(${hue}, 70%, 50%)`;
}
