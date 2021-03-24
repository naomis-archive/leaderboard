import * as Sentry from "@sentry/node";
import { logHandler } from "./logHandler";
export const errorHandler = (context: string, error: unknown): void => {
  logHandler.log("error", `There was an error in the ${context}:`);
  logHandler.log("error", error);
  Sentry.captureException(error);
};
