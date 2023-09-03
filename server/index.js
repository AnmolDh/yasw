import express from "express";
import bodyParser from "body-parser";
import { MOVIES } from "@consumet/extensions";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/home", async (req, res) => {});

app.get("/search/:query/:page?", async (req, res) => {
  const goku = new MOVIES.FlixHQ();
  const result = await goku.search(req.params.query, req.params.page);
  const movie = result.results[0];
  const info = await goku.fetchMediaInfo(movie.id);
  const src = await goku.fetchEpisodeSources(info.episodes[0].id, info.id);
  res.send(result);
});

app.listen("4000", () => console.log("Server started"));
