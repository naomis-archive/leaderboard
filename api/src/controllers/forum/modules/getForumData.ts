import fetch from "node-fetch";
import { sleep } from "../../../helpers/sleep";
import { ForumDataInt } from "../../../interfaces/forum/ForumDataInt";
import { errorHandler } from "../../../utils/errorHandler";

export const getForumData = async (): Promise<ForumDataInt> => {
  try {
    let page = 0;
    let rawData = await fetch(
      `https://forum.freecodecamp.org/directory_items.json?order=likes_received&period=weekly&page=${page}`
    );

    const totalData: ForumDataInt = await rawData.json();

    let parsedData = totalData;

    while (
      parsedData.directory_items[parsedData.directory_items.length - 1]
        .likes_received > 0
    ) {
      await sleep(3000);
      rawData = await fetch(
        `https://forum.freecodecamp.org/directory_items.json?order=likes_received&period=weekly&page=${++page}`
      );
      parsedData = await rawData.json();

      totalData.directory_items.push(...parsedData.directory_items);
    }

    return totalData;
  } catch (error) {
    errorHandler("Forum: Get Forum Data", error);
    process.exit(1);
  }
};
