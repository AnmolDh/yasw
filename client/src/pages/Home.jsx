import styled from "styled-components";
import Header from "../components/Header";
import Card from "../components/Card";
import Cards from "../components/Cards";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

const Main = styled.div`
  padding: 0 50px;
`;

function Home() {
  const serverUrl = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const [page, setPage] = useState("home");
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${serverUrl}/${page}`);
      setData(res.data);
    };
    fetchData();
  }, [page]);

  const trending = data
    ? data.trending.map((e) => {
        return <Card key={e.id} data={e} />;
      })
    : null;

  const recent = data
    ? data.recent.map((e) => {
        return <Card key={e.id} data={e} />;
      })
    : null;

  return data ? (
    <Main>
      <Header />
      <button onClick={()=>{setPage("tv")}}>TV</button>
      <Cards category="Trending Now">{trending}</Cards>
      <Cards category="Recently Added">{recent}</Cards>
    </Main>
  ) : (
    <Spinner />
  );
}

export default Home;
