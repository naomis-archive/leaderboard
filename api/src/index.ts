import express from "express";
import { getAllContribs } from "./controllers/getAllContribs";
import Spinnies from "spinnies";

export const spinnies = new Spinnies();

(async () => {
  spinnies.add("server-start", { color: "cyan", text: "Starting server..." });
  const API = express();

  spinnies.add("fetch-data", {
    color: "cyan",
    text: "Getting contribution data...",
  });

  const contributionData = await getAllContribs();

  spinnies.succeed("fetch-data", { color: "green", text: "Got data!" });

  API.listen(process.env.PORT || 3000, () => {
    spinnies.succeed("server-start", {
      color: "magenta",
      text: `API is live on ${process.env.PORT || 3000}`,
    });
  });
})();
