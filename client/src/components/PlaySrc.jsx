import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
`;

function PlaySrc(props) {
  const [noOfSeasons, setNoOfSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState("");
  const [noOfEpisodes, setNoOfEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState("");

  useEffect(() => {
    const nos = new Set();
    props.info &&
      props.info.type == "TV Series" &&
      props.info.episodes.map((ep) => {
        nos.add(ep.season);
      });
    setNoOfSeasons(Array.from(nos));
  }, [props.info]);

  useEffect(() => {
    const noe = new Array();
    props.info &&
      props.info.type == "TV Series" &&
      props.info.episodes
        .filter((ep) => ep.season == selectedSeason)
        .map((ep) => noe.push(ep));
    setNoOfEpisodes(noe);
  }, [selectedSeason]);

  return props.info.type === "Movie" ? (
    <Link
      to={`/player/${props.info.id}/${props.info.episodes[0].id}`}
    >
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
  );
}

export default PlaySrc;
