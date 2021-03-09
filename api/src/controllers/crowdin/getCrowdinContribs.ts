import { HeadersInit } from "node-fetch";
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
    let requestReport = await generateReport(apiHeader, project);

    const reportId = requestReport.data.identifier;

    while (requestReport.data.status !== "finished") {
      await sleep(3000);
      requestReport = await checkReportStatus(apiHeader, reportId, project);
    }

    const downloadLinkData = await getReportDownloadUrl(
      apiHeader,
      reportId,
      project
    );

    const downloadLink = downloadLinkData.data.url;

    const downloadData = await downloadReport(downloadLink);

    reportDataList.push(downloadData);
  }

  const totalData = compileReports(reportDataList);

  return totalData;
};
