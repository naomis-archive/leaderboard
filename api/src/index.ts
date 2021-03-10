import express from "express";
import { getAllContribs } from "./controllers/getAllContribs";
import Spinnies from "spinnies";
import { sendData } from "./routes/sendData";
import { FourOhFour } from "./routes/FourOhFour";
import cors from "cors";

export const spinnies = new Spinnies();

export const API = express();

(async () => {
  spinnies.add("server-start", { color: "cyan", text: "Starting server..." });

  spinnies.add("fetch-data", {
    color: "cyan",
    text: "Getting contribution data...",
  });

  const contributionData = await getAllContribs();

  spinnies.succeed("fetch-data", { color: "green", text: "Got data!" });

  const allowedOrigins = [
    "https://leaderboard.nhcarrigan.com",
    "http://localhost:4200",
  ];

  API.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    })
  );

  API.get("/", FourOhFour);

  API.get("/get-data", (req, res) => sendData(req, res, contributionData));

  API.use(FourOhFour);

  API.listen(process.env.PORT || 3000, () => {
    spinnies.succeed("server-start", {
      color: "magenta",
      text: `API is live on ${process.env.PORT || 3000}`,
    });
  });
})();
