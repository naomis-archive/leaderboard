import express from "express";
import { getAllContribs } from "./controllers/getAllContribs";
import Spinnies from "spinnies";
import { FourOhFour } from "./routes/FourOhFour";
import cors from "cors";
import { readFile } from "fs/promises";
import http from "http";
import https from "https";
import * as Sentry from "@sentry/node";
import { RewriteFrames } from "@sentry/integrations";
import { logHandler } from "./utils/logHandler";
import { connectDatabase } from "./controllers/database/dbConnect";
import { getUserData, postUserData } from "./routes/userData";
import { getAggregateData } from "./routes/aggregateData";
import { AggregateDataInt } from "./interfaces/UserDataInt";
import { getAggregateContribs } from "./controllers/getAggregateContribs";

export const spinnies = new Spinnies();

export const API = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  integrations: [
    new RewriteFrames({
      root: global.__dirname,
    }),
  ],
});

(async () => {
  spinnies.add("server-start", { color: "cyan", text: "Starting server..." });

  spinnies.add("database", {
    color: "cyan",
    text: "Connecting to database...",
  });

  await connectDatabase();

  spinnies.succeed("database", { color: "green", text: "Database connected!" });

  spinnies.add("fetch-data", {
    color: "cyan",
    text: "Getting contribution data...",
  });

  const contributionData = await getAllContribs();

  const aggregateData: AggregateDataInt[] = await getAggregateContribs(
    contributionData
  );

  spinnies.succeed("fetch-data", { color: "green", text: "Got data!" });

  const allowedOrigins = [
    "https://leaderboard.nhcarrigan.com",
    "http://localhost:4200",
    "http://localhost:8000",
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

  API.use(express.json());

  API.get("/", FourOhFour);

  API.get("/user", async (req, res) => getUserData(req, res));

  API.post("/user", async (req, res) =>
    postUserData(req, res, contributionData, aggregateData)
  );

  API.get("/aggregate", async (req, res) =>
    getAggregateData(req, res, aggregateData)
  );

  API.use(FourOhFour);

  spinnies.succeed("server-start", { color: "green", text: "server running!" });

  const httpServer = http.createServer(API);

  const httpPort =
    process.env.NODE_ENV === "production" ? 80 : process.env.PORT || 8080;

  httpServer.listen(httpPort, () => {
    logHandler.log("http", `HTTP server running on port ${httpPort}`);
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
      logHandler.log("http", "HTTPS Server running on port 443!");
    });
  }
})();
