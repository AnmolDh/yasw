import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import PlaySrc from "../components/PlaySrc";

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

function Info() {
  const serverUrl = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const mediaId = useLocation().pathname;
  const [info, setInfo] = useState();

  useEffect(() => {
    const fetchInfo = async () => {
      const res = await axios.get(`${serverUrl}/info${mediaId}`);
      setInfo(res.data);
    };
    fetchInfo();
  }, []);

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
            x
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
          <PlaySrc info={info} />
        </MovieInfo>
      </MovieContainer>
    </Main>
  ) : (
    <Spinner />
  );
}

export default Info;
