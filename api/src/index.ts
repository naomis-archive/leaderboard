import express from "express";
import { getAllContribs } from "./controllers/getAllContribs";
import Spinnies from "spinnies";
import { sendData } from "./routes/sendData";
import { FourOhFour } from "./routes/FourOhFour";
import cors from "cors";
import { readFile } from "fs/promises";
import http from "http";
import https from "https";
import chalk from "chalk";

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

  const httpServer = http.createServer(API);

  const httpPort =
    process.env.NODE_ENV === "production" ? 80 : process.env.PORT || 8080;

  httpServer.listen(httpPort, () => {
    console.log(chalk.magenta(`HTTP server running on port ${httpPort}`));
  });

  if (process.env.NODE_ENV === "production") {
    const privateKey = await readFile(
      "/etc/letsencrypt/live/leaderboard-api.nhcarrigan.com/privkey.pem",
      "utf8"
    );
    const certificate = await readFile(
      "/etc/letsencrypt/live/leaderboard-api.nhcarrigan.com/cert.pem",
      "utf8"
    );
    const ca = await readFile(
      "/etc/letsencrypt/live/leaderboard-api.nhcarrigan.com/chain.pem",
      "utf8"
    );

    const credentails = {
      key: privateKey,
      cert: certificate,
      ca: ca,
    };
    const httpsServer = https.createServer(credentails, API);

    httpsServer.listen(443, () => {
      console.log("HTTPS Server running on port 443!");
    });
  }

  spinnies.succeed("server-start", { color: "green", text: "server running!" });
})();
