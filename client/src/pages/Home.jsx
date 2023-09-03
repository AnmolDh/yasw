import styled from "styled-components";
import Header from "../components/Header";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";

const Main = styled.div`
  padding: 0 50px;
`;

const H2 = styled.h2`
  padding-top: 60px;
  margin-bottom: 20px;
`;

function Home() {
  const [data, setData] = useState({ trending: [], recent: [] });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:4000/");
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <Main>
      <Header />
      <div>
        <H2>Trending Now</H2>
      </div>
      <Card trending={data.trending} />
    </Main>
  );
}

export default Home;
