import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Movie() {
  const mediaId = useLocation().pathname;
  const [info, setInfo] = useState();

  console.log(mediaId);
  useEffect(() => {
    const fetchInfo = async () => {
      const res = axios.get(`http://localhost:4000/info${mediaId}`);
      setInfo(res);
    };
    fetchInfo();
  }, []);

  console.log(info);
  return <div>{/* Display movie details here */}</div>;
}

export default Movie;
