import fetch, { HeadersInit } from "node-fetch";
import { CrowdinProjectInt } from "../../../interfaces/crowdin/CrowdinProjectInt";
import { InitialReportInt } from "../../../interfaces/crowdin/InitialReportInt";
import { errorHandler } from "../../../utils/errorHandler";

export const generateReport = async (
  headers: HeadersInit,
  project: CrowdinProjectInt
): Promise<InitialReportInt> => {
  try {
    const body = {
      name: "top-members",
      schema: {
        unit: "words",
        format: "json",
        dateFrom: new Date(Date.now() - 604800000).toISOString(),
        dateTo: new Date(Date.now()).toISOString(),
      },
    };

    const rawData = await fetch(
      `https://freecodecamp.crowdin.com/api/v2/projects/${project.id}/reports`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers,
      }
    );

    const parsedData: InitialReportInt = await rawData.json();

    return parsedData;
  } catch (error) {
    errorHandler("Crowdin: Generate Report", error);
    process.exit(1);
  }
};
