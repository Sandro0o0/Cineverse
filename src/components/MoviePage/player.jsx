import React from "react";

const MoviePlayers = {
  VidLink: (id) => {
    return `https://vidlink.pro/movie/${id}`;
  },
};

export function Player({ MovieData }) {
  return (
    <>
      <iframe
        src={MoviePlayers.VidLink(MovieData.id)}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </>
  );
}
