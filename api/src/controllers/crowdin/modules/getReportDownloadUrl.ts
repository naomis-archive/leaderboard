import fetch, { HeadersInit } from "node-fetch";
import { CrowdinProjectInt } from "../../../interfaces/crowdin/CrowdinProjectInt";
import { ReportDownloadUrlInt } from "../../../interfaces/crowdin/ReportDownloadUrlInt";
import { errorHandler } from "../../../utils/errorHandler";

export const getReportDownloadUrl = async (
  headers: HeadersInit,
  identifier: string,
  project: CrowdinProjectInt
): Promise<ReportDownloadUrlInt> => {
  try {
    const rawData = await fetch(
      `https://freecodecamp.crowdin.com/api/v2/projects/${project.id}/reports/${identifier}/download`,
      {
        method: "GET",
        headers,
      }
    );

    const parsedData: ReportDownloadUrlInt = await rawData.json();

    return parsedData;
  } catch (error) {
    errorHandler("Crowdin: Get Report Download URL", error);
    process.exit(1);
  }
};
