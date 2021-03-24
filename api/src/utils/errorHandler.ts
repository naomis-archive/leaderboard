import Sentry from "@sentry/node";
export const errorHandler = (context: string, error: unknown): void => {
  console.error(`There was an error in the ${context}:`);
  console.error(error);
  Sentry.captureException(error);
};
