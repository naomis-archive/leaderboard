import fetch from "node-fetch";
import { FinalReportInt } from "../../../interfaces/crowdin/FinalReportInt";
import { errorHandler } from "../../../utils/errorHandler";

export const downloadReport = async (url: string): Promise<FinalReportInt> => {
  try {
    const rawData = await fetch(url, {
      method: "get",
    });

    const parsedData: FinalReportInt = await rawData.json();

    return parsedData;
  } catch (error) {
    errorHandler("Crowdin: Download Report", error);
    process.exit(1);
  }
};
