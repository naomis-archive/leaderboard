import fetch, { HeadersInit } from "node-fetch";
import { CrowdinProjectInt } from "../../../interfaces/crowdin/CrowdinProjectInt";
import { ReportDownloadUrlInt } from "../../../interfaces/crowdin/ReportDownloadUrlInt";

export const getReportDownloadUrl = async (
  headers: HeadersInit,
  identifier: string,
  project: CrowdinProjectInt
): Promise<ReportDownloadUrlInt> => {
  const rawData = await fetch(
    `https://freecodecamp.crowdin.com/api/v2/projects/${project.id}/reports/${identifier}/download`,
    {
      method: "GET",
      headers,
    }
  );

  const parsedData: ReportDownloadUrlInt = await rawData.json();

  return parsedData;
};
