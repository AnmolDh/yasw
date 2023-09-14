import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { MOVIES } from "@consumet/extensions";

const app = express();
const api = new MOVIES.FlixHQ();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("API is Running!!"));

app.get("/home", async (req, res) => {
  console.log("req home");
  const trending = await api.fetchTrendingMovies();
  const recent = await api.fetchRecentMovies();
  res.send({ trending, recent });
});

app.get("/info/:category/:mediaId", async (req, res) => {
  const mediaId = req.params.category + "/" + req.params.mediaId;
  const info = await api.fetchMediaInfo(mediaId);
  res.send(info);
});

app.get("/src/:category/:mediaId/:episodeId", async (req, res) => {
  const mediaId = req.params.category + "/" + req.params.mediaId;
  const src = await api.fetchEpisodeSources(req.params.episodeId, mediaId);
  console.log("req src");
  res.send(src);
});

app.get("/search/:query/:page?", async (req, res) => {
  const result = await api.search(req.params.query, req.params.page);
  // const movie = result.results[0];
  // const info = await api.fetchMediaInfo(movie.id);
  // const src = await api.fetchEpisodeSources(info.episodes[0].id, info.id);
  res.send(result);
});

app.listen(4000, () => console.log("Server started"));
