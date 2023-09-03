import styled from "styled-components";
import Header from "../components/Header";
import Card from "../components/Card";
import Cards from "../components/Cards";
import { useEffect, useState } from "react";
import axios from "axios";

const Main = styled.div`
  padding: 0 50px;
`;

function Home() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:4000/home");
      setData(res.data);
    };
    fetchData();
  }, []);

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

  return (
    <Main>
      <Header />
      <Cards category="Trending Now">{trending}</Cards>
      <Cards category="Recently Added">{recent}</Cards>
    </Main>
  );
}

export default Home;
