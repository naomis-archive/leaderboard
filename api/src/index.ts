import express from "express";
import { getAllContribs } from "./controllers/getAllContribs";

(async () => {
  console.log("Starting server!");
  const API = express();

  console.log("Getting data...");

  const contributionData = await getAllContribs();

  console.log("Data get!");

  console.log(contributionData.crowdin.slice(0, 10));

  API.listen(process.env.PORT || 3000, () => {
    console.log("Api is live on " + (process.env.PORT || 3000));
  });
})();
