import axios from "axios";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Cards from "../components/Cards";
import Card from "../components/Card";

function Search() {
  const serverUrl = import.meta.env.VITE_REACT_APP_SERVER_URL;
  const [searchParams, setSearchParams] = useSearchParams({ q: "", page: "1" });
  const query = searchParams.get("q");
  const page = searchParams.get("page");
  const [data, setData] = useState();

  const searchQuery = async (q, p) => {
    const res = await axios.get(`${serverUrl}/search/${q}/${p}`);
    setData(res.data);
    console.log(res.data);
  };

  const results = data
    ? data.results.map((e) => {
        return <Card key={e.id} data={e} />;
      })
    : null;

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) =>
          setSearchParams((prev) => {
            prev.set("q", e.target.value);
            return prev;
          })
        }
      ></input>
      <button
        onClick={() => {
          searchQuery(query, page);
        }}
      >
        Search
      </button>

      <Cards category="">{results}</Cards>
    </div>
  );
}

export default Search;
