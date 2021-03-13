import { FinalReportInt } from "../../../interfaces/crowdin/FinalReportInt";
import { CrowdinContribsInt } from "../../../interfaces/crowdin/CrowdinContribsInt";

export const compileReports = (
  reportList: FinalReportInt[]
): CrowdinContribsInt[] => {
  const compiled: CrowdinContribsInt[] = [];

  for (const report of reportList) {
    const contribs = report.data;
    for (const contributor of contribs) {
      const name = contributor.user.fullName;
      const languages = contributor.languages.map((lang) => lang.name);
      const translations = contributor.translated;
      const avatar = contributor.user.avatarUrl;

      const exists = compiled.find((el) => el.name === name);
      if (!exists) {
        compiled.push({
          name,
          languages,
          translations,
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
    .filter((cont) => cont.translations > 0);

  return sorted;
};
