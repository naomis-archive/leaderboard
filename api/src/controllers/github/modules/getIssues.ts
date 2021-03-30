import { RawIssueInt } from "../../../interfaces/github/RawIssueInt";

export const getIssues = async (): Promise<RawIssueInt[]> => {
  const lastWeek = new Date(Date.now() - 604800000).toISOString();

  let page = 1;

  const totalData: RawIssueInt[] = [];

  let rawData = await fetch(
    `https://api.github.com/repos/freeCodeCamp/freeCodeCamp/issues?since=${lastWeek}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-GitHub-Media-Type": "github.v3",
      },
    }
  );

  let parsedData: RawIssueInt[] = await rawData.json();

  totalData.push(...parsedData);

  while (parsedData.length) {
    rawData = await fetch(
      `https://api.github.com/repos/freeCodeCamp/freeCodeCamp/issues?since=${lastWeek}&page=${++page}`,
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
};
