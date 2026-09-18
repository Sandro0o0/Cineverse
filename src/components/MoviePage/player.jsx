import React, { useEffect, useRef, useState } from "react";
import { movieData } from "../../scripts/api";

// Styles
import "../../style/MoviePage/player.css";

// General Player Data
const MoviePlayers = {
  VidLink: (id) => `https://vidlink.pro/movie/${id}`,
  MovieWeb: (id) => `https://movie-web.app/movie/${id}`,
  Embed2: (id) => `https://www.2embed.cc/embed/${id}`,
  SmashyStream: (id) => `https://embed.smashystream.com/play/${id}`,
  SuperEmbed: (id) => `https://superembed.stream/movie/${id}`,
  Cataz: (id) => `https://cataz.to/movie/${id}`,
  FlixHQ: (id) => `https://flixhq.to/movie/${id}`,
};
const MovieKeys = Object.keys(MoviePlayers);
//========================================================>

export function Player({ MovieData }) {
  const [currentServer, setCurrentServer] = useState(MoviePlayers.VidLink(""));

  useEffect(() => {
    const serverList = Array.from(document.querySelectorAll(".server-list"));
    serverList.forEach((e, index) => {
      e.style.color = getGradientColor(index, serverList.length);
    });
    if (!currentServer.includes("vidlink")) return;

    setCurrentServer(MoviePlayers.VidLink(MovieData.id));
  }, [currentServer]);

  return (
    <>
      <div className="player-container">
        <div className="movie-title">{MovieData.title}</div>
        <iframe src={currentServer} frameBorder="0" allowFullScreen></iframe>
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
  // server(MoviePlayers.VidLink(MovieData.id));

  return (
    <>
      <div className="player-server-container">
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
        className="server-list"
      >
        {serverName}
      </div>
    </>
  );
}

//

function removeActive(lst) {
  lst.forEach((ele) => ele.classList.remove("active"));
}

function getGradientColor(index, total) {
  const hue = (index / total) * 360; // spread across full color wheel
  return `hsl(${hue}, 70%, 50%)`;
}
