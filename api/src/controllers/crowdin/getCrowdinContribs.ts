import { HeadersInit } from "node-fetch";
import { spinnies } from "../..";
import { crowdinProjectList } from "../../config/crowdinProjectList";
import { sleep } from "../../helpers/sleep";
import { FinalReportInt } from "../../interfaces/crowdin/FinalReportInt";
import { TotalContribsInt } from "../../interfaces/crowdin/TotalContribsInt";
import { checkReportStatus } from "./modules/checkReportStatus";
import { compileReports } from "./modules/compileReports";
import { downloadReport } from "./modules/downloadReport";
import { generateReport } from "./modules/generateReport";
import { getReportDownloadUrl } from "./modules/getReportDownloadUrl";

export const getCrowdinContribs = async (): Promise<TotalContribsInt[]> => {
  const credentials = process.env.CROWDIN_API_KEY;

  if (!credentials) {
    console.error("Crowdin API Token not found.");
    process.exit(1);
  }

  const apiHeader: HeadersInit = {
    Authorization: `Bearer ${credentials}`,
    "Content-Type": "application/json",
  };

  const reportDataList: FinalReportInt[] = [];

  for (const project of crowdinProjectList) {
    spinnies.add(`crowdin-${project.name}`, {
      color: "cyan",
      text: `Getting data for ${project.name}`,
    });
    let requestReport = await generateReport(apiHeader, project);

    const reportId = requestReport.data.identifier;

    let retries = 1;

    while (requestReport.data.status !== "finished") {
      spinnies.update(`crowdin-${project.name}`, {
        color: "cyan",
        text: `Waiting for ${project.name} - Attempt ${++retries}`,
      });
      await sleep(3000);
      requestReport = await checkReportStatus(apiHeader, reportId, project);
    }

    spinnies.update(`crowdin-${project.name}`, {
      color: "cyan",
      text: `Getting ${project.name} download URL`,
    });

    const downloadLinkData = await getReportDownloadUrl(
      apiHeader,
      reportId,
      project
    );

    const downloadLink = downloadLinkData.data.url;

    spinnies.update(`crowdin-${project.name}`, {
      text: `Downloading ${project.name} data.`,
    });

    const downloadData = await downloadReport(downloadLink);

    spinnies.succeed(`crowdin-${project.name}`, {
      color: "green",
      text: `${project.name} download complete!`,
    });

    reportDataList.push(downloadData);
  }

  spinnies.add("crowdin-compile", {
    color: "cyan",
    text: "Compiling Crowdin totals...",
  });

  const totalData = compileReports(reportDataList);

  spinnies.succeed("crowdin-compile", {
    color: "green",
    text: "Crowdin data compiled!",
  });

  return totalData;
};
