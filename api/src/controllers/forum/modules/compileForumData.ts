import { ForumContribInt } from "../../../interfaces/forum/ForumContribInt";
import { ForumDataInt } from "../../../interfaces/forum/ForumDataInt";

export const compileForumData = (data: ForumDataInt): ForumContribInt[] => {
  const finalData: ForumContribInt[] = [];

  const userList = data.directory_items;

  for (const user of userList) {
    const properData: ForumContribInt = {
      username: user.user.username,
      name: user.user.name,
      likes: user.likes_received,
      liked: user.likes_given,
    };

    finalData.push(properData);
  }

  return finalData;
};
