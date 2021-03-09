import { FinalReportInt } from "../../../interfaces/crowdin/FinalReportInt";
import { TotalContribsInt } from "../../../interfaces/crowdin/TotalContribsInt";

export const compileReports = (
  reportList: FinalReportInt[]
): TotalContribsInt[] => {
  const compiled: TotalContribsInt[] = [];

  for (const report of reportList) {
    const contribs = report.data;
    for (const contributor of contribs) {
      const name = contributor.user.username;
      const languages = contributor.languages.map((lang) => lang.name);
      const translations = contributor.translated;

      const exists = compiled.find((el) => el.name === name);
      if (!exists) {
        compiled.push({
          name,
          languages,
          translations,
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

  const sorted = compiled.sort((a, b) => b.translations - a.translations);

  return sorted;
};
