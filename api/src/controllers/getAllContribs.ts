import { spinnies } from "..";
import { ContribDataInt } from "../interfaces/ContribDataInt";
import { getCrowdinContribs } from "./crowdin/getCrowdinContribs";

export const getAllContribs = async (): Promise<ContribDataInt> => {
  spinnies.add("get-crowdin", {
    color: "cyan",
    text: "Getting crowdin data...",
  });
  const crowdinData = await getCrowdinContribs();
  spinnies.succeed("get-crowdin", {
    color: "green",
    text: "Got crowdin data!",
  });

  const contribData: ContribDataInt = {
    crowdin: crowdinData,
  };

  return contribData;
};
