import fetch from "node-fetch";
import { ForumDataInt } from "../../../interfaces/forum/ForumDataInt";

export const getForumData = async (): Promise<ForumDataInt> => {
  const rawData = await fetch(
    "https://forum.freecodecamp.org/directory_items.json?order=likes_received&period=weekly"
  );

  const parsedData: ForumDataInt = await rawData.json();

  return parsedData;
};
