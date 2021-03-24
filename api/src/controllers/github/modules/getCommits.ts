import fetch from "node-fetch";
import { RawCommitInt } from "../../../interfaces/github/RawCommitInt";
import { errorHandler } from "../../../utils/errorHandler";

export const getCommits = async (): Promise<RawCommitInt[]> => {
  try {
    const lastWeek = new Date(Date.now() - 604800000).toISOString();

    let page = 1;

    const totalData: RawCommitInt[] = [];

    let rawData = await fetch(
      `https://api.github.com/repos/freeCodeCamp/freeCodeCamp/commits?since=${lastWeek}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-GitHub-Media-Type": "github.v3",
        },
      }
    );

    let parsedData: RawCommitInt[] = await rawData.json();

    totalData.push(...parsedData);

    while (parsedData.length) {
      rawData = await fetch(
        `https://api.github.com/repos/freeCodeCamp/freeCodeCamp/commits?since=${lastWeek}&page=${++page}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-GitHub-Media-Type": "github.v3",
          },
        }
      );

      parsedData = await rawData.json();

      totalData.push(...parsedData);
    }

    return totalData;
  } catch (error) {
    errorHandler("Github: Get Commits", error);
    process.exit(1);
  }
};
