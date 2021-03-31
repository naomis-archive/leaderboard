import { FinalReportInt } from "../../../interfaces/crowdin/FinalReportInt";
import { CrowdinContribsInt } from "../../../interfaces/crowdin/CrowdinContribsInt";
import { crowdinStaffList } from "../../../config/staffList";
import { errorHandler } from "../../../utils/errorHandler";

export const compileReports = (
  reportList: FinalReportInt[]
): CrowdinContribsInt[] => {
  try {
    const compiled: CrowdinContribsInt[] = [];

    for (const report of reportList) {
      const contribs = report.data;
      for (const contributor of contribs) {
        if (crowdinStaffList.includes(contributor.user.username)) {
          continue;
        }
        const name = contributor.user.fullName;
        const username = contributor.user.username;
        const languages = contributor.languages.map((lang) => lang.name);
        const translations = contributor.translated;
        const avatar = contributor.user.avatarUrl;
        const votes = contributor.voted;
        const approvals = contributor.approved;

        const exists = compiled.find((el) => el.name === name);
        if (!exists) {
          compiled.push({
            name,
            username,
            languages,
            translations,
            approvals,
            votes,
            avatar,
          });
          continue;
        }

        exists.translations += translations;
        for (const lang of languages) {
          if (!exists.languages.includes(lang)) {
            exists.languages.push(lang);
          }
        }
      }
    }

    const sorted = compiled
      .sort((a, b) => b.translations - a.translations)
      .filter(
        (cont) => cont.translations > 0 || cont.approvals > 0 || cont.votes > 0
      );

    return sorted;
  } catch (error) {
    errorHandler("Crowdin: Compile Reports", error);
    process.exit(1);
  }
};
