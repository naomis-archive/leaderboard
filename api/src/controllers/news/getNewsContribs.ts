import { spinnies } from "../..";
import { NewsContribInt } from "../../interfaces/news/NewsContribInt";
import { compileNewsData } from "./modules/compileNewsData";
import { getNewsData } from "./modules/getNewsData";

export const getNewsContribs = async (): Promise<NewsContribInt[]> => {
  spinnies.add("get-posts", {
    color: "cyan",
    text: "Getting post data...",
  });

  const newsData = await getNewsData();

  spinnies.succeed("get-posts", {
    color: "green",
    text: "Got post data!",
  });

  spinnies.add("compile-posts", {
    color: "cyan",
    text: "Compiling post data...",
  });

  const compiledData = await compileNewsData(newsData);

  spinnies.succeed("compile-posts", {
    color: "green",
    text: "Compiled post data!",
  });

  return compiledData;
};
