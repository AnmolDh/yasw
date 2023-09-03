import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { MOVIES } from "@consumet/extensions";

const app = express();
const goku = new MOVIES.FlixHQ();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const trending = await goku.fetchTrendingMovies();
  const recent = await goku.fetchRecentMovies();
  res.send({ trending, recent });
});

app.get("/search/:query/:page?", async (req, res) => {
  const result = await goku.search(req.params.query, req.params.page);
  const movie = result.results[0];
  const info = await goku.fetchMediaInfo(movie.id);
  const src = await goku.fetchEpisodeSources(info.episodes[0].id, info.id);
  res.send(result);
});

app.listen("4000", () => console.log("Server started"));
