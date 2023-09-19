import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "../components/Header";
import Spinner from "../components/Spinner";

const Main = styled.div`
  padding: 0 50px;
  position: relative;
  color: #fff;
  min-height: 100vh;
`;

const BlurredBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: ${(props) => `url(${props.cover})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  filter: blur(5px);
  z-index: -1;
`;

const TintOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: -1;
`;

const MovieContainer = styled.div`
  display: flex;
  background-color: transparent;
  padding: 20px;
  z-index: 1;
`;

const MovieInfo = styled.div`
  flex: 1;
`;

const Details = styled.p`
  margin: 10px 0;
`;

const Description = styled.p`
  color: #6c757d;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
`;

function Info() {
  const serverUrl = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const mediaId = useLocation().pathname;
  const [info, setInfo] = useState();
  const [noOfSeasons, setNoOfSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const [noOfEpisodes, setNoOfEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState("");

  useEffect(() => {
    const fetchInfo = async () => {
      const res = await axios.get(`${serverUrl}/info${mediaId}`);
      setInfo(res.data);
    };
    fetchInfo();
  }, []);

  useEffect(() => {
    const nos = new Set();
    info &&
      info.type == "TV Series" &&
      info.episodes.map((ep) => {
        nos.add(ep.season);
      });
    setNoOfSeasons(Array.from(nos));
  }, [info]);

  useEffect(() => {
    const noe = new Array();
    info &&
      info.type == "TV Series" &&
      info.episodes
        .filter((ep) => ep.season == selectedSeason)
        .map((ep) => noe.push(ep));
    setNoOfEpisodes(noe);
  }, [selectedSeason]);

  return info ? (
    <Main>
      <BlurredBackground cover={info ? info.cover : "none"} />
      <TintOverlay />
      <Header />
      <MovieContainer>
        <div>
          <img width="90%" src={info.image} alt={info.title} />
        </div>
        <MovieInfo>
          <h1>{info.title}</h1>
          <Description>{info.description}</Description>
          <div>
            <Details>
              <strong>Country:</strong> {info.country}
            </Details>
            <Details>
              <strong>Genre:</strong>{" "}
              {info.genres.map((e) => (
                <span key={e}>{e} </span>
              ))}
            </Details>
            <Details>
              <strong>Released:</strong> {info.releaseDate}
            </Details>
            <Details>
              <strong>Production:</strong> {info.production}
            </Details>
            <Details>
              <strong>Cast:</strong>{" "}
              {info.casts.map((e) => (
                <span key={e}>{e}. </span>
              ))}
            </Details>
          </div>
          {info.type === "Movie" ? (
            <Link to={`/player/${info.id}/${info.episodes[0].id}`}>
              <Button>Play</Button>
            </Link>
          ) : (
            <div>
              <select
                value={selectedSeason}
                onChange={(e) => {
                  setSelectedSeason(e.target.value);
                }}
              >
                <option>Select a season</option>
                {noOfSeasons.map((s) => (
                  <option key={s} value={s}>
                    Season {s}
                  </option>
                ))}
              </select>
              <select
                value={selectedEpisode}
                onChange={(e) => setSelectedEpisode(e.target.value)}
              >
                <option value="">Select an episode</option>
                {noOfEpisodes.map((ep) => (
                  <option key={ep.id} value={ep.id}>
                    {ep.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </MovieInfo>
      </MovieContainer>
    </Main>
  ) : (
    <Spinner />
  );
}

export default Info;
