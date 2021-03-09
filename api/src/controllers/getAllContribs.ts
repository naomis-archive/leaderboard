import { ContribDataInt } from "../interfaces/ContribDataInt";
import { getCrowdinContribs } from "./crowdin/getCrowdinContribs";

export const getAllContribs = async (): Promise<ContribDataInt> => {
  console.log("Getting Crowdin data...");
  const crowdinData = await getCrowdinContribs();

  const contribData: ContribDataInt = {
    crowdin: crowdinData,
  };

  return contribData;
};
