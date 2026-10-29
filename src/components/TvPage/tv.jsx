import { Header } from "../layout";
import { PullSeries } from "@/scripts/api/Movie";

import "../../style/tvpage/tv-page.css";
import { data, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { movieData, TMDB_IMAGE_BASE_URL } from "@/scripts/api";

import { PlayerServerContainer } from "../MoviePage/player";
import { Content } from "../MoviePage/MoviePageContent";
import TechText from "../TechText";
import "../../style/MoviePage/player.css";

const MoviePlayers = {
  VidLink: (id, season = 1, ep = 1) =>
    `https://vidlink.pro/tv/${id}/${season}/${ep}`,

  MovieWeb: (id, season = 1, ep = 1) =>
    `https://movie-web.app/tv/${id}/${season}/${ep}`,

  Embed2: (id, season = 1, ep = 1) =>
    `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${ep}`,

  SuperEmbed: (id, season = 1, ep = 1) =>
    `https://superembed.stream/tv/${id}/${season}/${ep}`,

  Cataz: (id, season = 1, ep = 1) =>
    `https://cataz.to/tv/${id}/${season}/${ep}`,

  FlixHQ: (id, season = 1, ep = 1) =>
    `https://flixhq.to/tv/${id}/${season}/${ep}`,

  Videasy: (id, season = 1, ep = 1) =>
    `https://player.videasy.net/tv/${id}/${season}/${ep}?autoplay=true`,

  VidCore: (id, season = 1, ep = 1) =>
    `https://vidcore.org/embed/tv/${id}/${season}/${ep}?autoplay=true`,

  VidSrc: (id, season = 1, ep = 1) =>
    `https://vidsrc.xyz/embed/tv/${id}/${season}-${ep}`,

  VidSrcTo: (id, season = 1, ep = 1) =>
    `https://vidsrc.to/embed/tv/${id}/${season}/${ep}`,

  AutoEmbed: (id, season = 1, ep = 1) =>
    `https://autoembed.co/tv/tmdb/${id}-${season}-${ep}`,

  EmbedAPI: (id, season = 1, ep = 1) =>
    `https://watch.embed-api.stream/embed/tv/${id}/${season}/${ep}`,

  VidSrcAPI: (id, season = 1, ep = 1) =>
    `https://vidsrcapi.com/embed/tv/${id}/${season}/${ep}`,
};
const MovieKeys = Object.keys(MoviePlayers);

function SeriesAndEpisodes({ data = "", setPlayerLoad }) {
  const [season, setSeason] = useState(
    Number(new URLSearchParams(window.location.search).get("season")) || 1,
  );

  const [currentEpisode, setCurrentEpisode] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const season = Number(params.get("season")) || 1;
    const ep = Number(params.get("ep")) || 1;

    return { [season]: ep };
  });

  const [EpisodeCount, setEpisodeCount] = useState(0);

  const navigate = useNavigate();

  // Get the active episode for the current season
  const activeEpisode = currentEpisode[season];

  useEffect(() => {
    const selectedSeason = data?.seasons?.find(
      (s) => s.season_number === Number(season),
    );

    setEpisodeCount(selectedSeason?.episode_count ?? 0);
  }, [data, season]);

  return (
    <div className="w-full border-t border-white/10 bg-[#131313]">
      <div className="flex w-full flex-col gap-3 px-3 py-3 sm:px-6 lg:min-h-[76px] lg:flex-row lg:items-center lg:justify-between lg:gap-4">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex shrink-0 items-center gap-2 sm:border-r-2 sm:px-2">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-white sm:text-base">
                Episodes
              </h3>
              <p className="mt-1 whitespace-nowrap text-xs text-gray-500">
                Choose a season to watch
              </p>
            </div>
          </div>

          <div className="episodes flex max-w-full flex-row gap-3 overflow-x-auto py-2 pr-2 sm:py-1">
            {Array.from({ length: EpisodeCount }, (_, i) => {
              const episodeNumber = i + 1;
              const isActive = activeEpisode === episodeNumber;

              return (
                <span
                  key={`${season}-${episodeNumber}`}
                  onClick={() => {
                    setCurrentEpisode((prev) => ({
                      ...prev,
                      [season]: episodeNumber,
                    }));

                    navigate(
                      `/tv/?id=${data?.id}&season=${season}&ep=${episodeNumber}`,
                    );
                  }}
                  className={`fade-in-opacity shrink-0 cursor-pointer rounded-sm bg-[#333] px-3 py-1 text-xl text-[#ccc] transition-all duration-75 hover:scale-110 hover:text-white ${
                    isActive ? "scale-110 bg-red-700 text-white" : "scale-100"
                  }`}
                >
                  {episodeNumber}
                </span>
              );
            })}
          </div>
        </div>

        <div className="relative w-full shrink-0 sm:w-36 lg:w-36">
          <select
            value={season}
            onChange={(e) => {
              setSeason(Number(e.target.value));
            }}
            name="season"
            aria-label="Select season"
            className="h-11 w-full cursor-pointer appearance-none rounded-md border border-white/10 bg-[#1c1c1c] px-3 pr-9 text-sm text-white outline-none transition-colors hover:border-white/30 focus:border-white/40"
          >
            {data?.seasons
              ?.filter((s) => s.season_number > 0)
              .map((s) => (
                <option key={s.id} value={s.season_number}>
                  Season {s.season_number}
                </option>
              ))}
          </select>

          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            ▼
          </span>
        </div>
      </div>
    </div>
  );
}
function Navigation() {
  const navigator = useNavigate();
  return (
    <>
      <div className="navigation border-b-2 text-[#ff02ff] px-2 gap-3 flex flex-row items-center w-full">
        <h2 onClick={() => navigator("/")}>home</h2>
        <span>/</span>
        <h3>tv</h3>
        <span>/</span>
        <h5>name</h5>
      </div>
    </>
  );
}

function TvPlayer({ MovieData, season = "1", ep = "1" }) {
  const [currentServer, setCurrentServer] = useState(
    MoviePlayers.VidLink(MovieData?.id, season, ep),
  );
  const [data, setData] = useState(MovieData);
  // setData(movieData);
  const serverList = Array.from(document.querySelectorAll(".server-list"));
  const [playerLoad, setPlayerLoad] = useState(false); // Boolean

  const iframeRef = useRef(null);

  function handleStars() {
    const rating = MovieData?.vote_average / 2; // MovieData.vote_average / 2

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

  // console.log(MovieData);
  useEffect(() => {
    serverList.forEach((e, index) => {
      e.style.color = getGradientColor(index, serverList.length);

      function getGradientColor(index, total) {
        const hue = (index / total) * 360; // spread across full color wheel
        return `hsl(${hue}, 70%, 50%)`;
      }
      // GradientColor(index, serverList.length);
    });
    if (!currentServer.includes("vidlink")) return;

    setCurrentServer(MoviePlayers.VidLink(MovieData?.id, season, ep));
  }, [currentServer, MovieData, season, ep]);

  if (!playerLoad) {
    return (
      <>
        <div className="fade-in-opacity flex flex-col">
          <div className="player-placeholder rounded-2xl overflow-hidden rounded-b-none relative bg-green-600 mt-5">
            <img
              className="absolute w-full object-cover min-h-full"
              src={TMDB_IMAGE_BASE_URL + MovieData?.backdrop_path}
              alt=""
            />
            <div className="image-cover absolute opacity-[0.7] w-full h-full bg-[#000]"></div>

            <div className="content-wrapper min-h-[80vh] flex flex-row justify-between items-end">
              <div className="content relative w-fit flex text-[#fff] flex-col gap-2 justify-end items-start p-5">
                <div className="relative flex justify-start p-0 m-0 h-20 w-100 border-b-2">
                  <TechText
                    text={MovieData?.name}
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
                        <div key={ele.name + index}>
                          <p
                            // key={index + 1}
                            className="m-0 text-sm text-[#fff] w-[min-content]"
                          >
                            {ele.name}
                          </p>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="rating flex  flex-row gap-2 items-center text-[#CB904D]">
                  <div className="stars">{handleStars()}</div>
                  <span className="w-1 h-1 rounded-[50%] opacity-[0.5] bg-green-100"></span>
                  <p className="m-0">({MovieData?.vote_average.toFixed(1)})</p>
                </div>
                <p className="max-w-[70%] text-[#fff] opacity-[0.8] ">
                  {MovieData?.overview.split(" ").slice(0, 50).join(" ")}
                </p>
                <div className="tv-nav flex flex-row items-center">
                  <span className="text-sm flex nowrap font-bold">
                    Season:{" "}
                    <p className="px-2  text-[#CB904D]">{season}</p>{" "}
                  </span>
                  <span className="text-sm flex nowrap font-bold">
                    Episode: <p className="px-2  text-[#CB904D]">{ep}</p>
                  </span>
                </div>
              </div>
              <div className="relative play-icon w-[50%] min-h-[50vh] flex justify-center items-center ">
                <i
                  onClick={() => setPlayerLoad(true)}
                  className="fa-solid fa-play text-xl cursor-pointer bg-white p-2 px-3 rounded-5 border-2 "
                ></i>{" "}
              </div>
            </div>
          </div>
          <SeriesAndEpisodes data={MovieData} setPlayerLoad={setPlayerLoad} />
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
    <div className="player-container fade-in-opacity w-full min-w-0 overflow-hidden rounded-b-none">
      {/* Responsive video player */}
      <div className="frame-wrapper relative aspect-video w-full overflow-hidden bg-black">
        <iframe
          src={currentServer}
          title="Movie or TV episode player"
          frameBorder="0"
          allowFullScreen
          ref={iframeRef}
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>

      {/* Episodes and seasons */}
      <div className="w-full min-w-0">
        <SeriesAndEpisodes data={MovieData} />
      </div>

      {/* Server recommendation */}
      <p className="server-recommend-message px-3 py-3 text-center text-xs leading-relaxed text-gray-400 sm:px-4 sm:text-sm">
        If the player doesn't work, try another server.
      </p>

      {/* Server selection */}
      <div className="w-full min-w-0 px-2 pb-3 sm:px-4">
        <PlayerServerContainer
          data={MovieData}
          server={setCurrentServer}
          ServerNames={MovieKeys}
        />
      </div>
    </div>
  );
}

export function Tv() {
  const url = new URLSearchParams(window.location.search);
  const [data, setData] = useState();

  // Loads Data from url
  const seriesId = url.get("id"); // GET id from url
  const season = url.get("season"); // GET Season from url
  const episode = url.get("ep"); // GET Episode from url

  //
  const loadData = async () => {
    const dt = await PullSeries(seriesId);
    setData(dt);
    // console.log(dt);
    return data;
  };
  loadData();

  return (
    <>
      <Header />
      <Navigation />
      <main className="movie-page-container">
        <img
          className="player-img"
          src={TMDB_IMAGE_BASE_URL + data?.backdrop_path}
          alt=""
        />
        <div className="player-img-cover"></div>
        <TvPlayer MovieData={data} season={season} ep={episode} />
        <Content MovieData={data} />
      </main>

      {/* <SeriesAndEpisodes /> */}
    </>
  );
}

function getGradientColor(index, total) {
  const hue = (index / total) * 360; // spread across full color wheel
  return `hsl(${hue}, 70%, 50%)`;
}
