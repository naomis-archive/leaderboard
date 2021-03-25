import { connect } from "mongoose";
import { errorHandler } from "../../utils/errorHandler";
import { logHandler } from "../../utils/logHandler";

export const connectDatabase = async (): Promise<void> => {
  const dbString =
    process.env.MONGO_URI || "mongodb://localhost:27017/leaderboard-testing";

  if (!dbString) {
    logHandler.log("error", "Missing database string!");
    process.exit(1);
  }

  try {
    await connect(dbString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    errorHandler("database connection", error);
  }
};
