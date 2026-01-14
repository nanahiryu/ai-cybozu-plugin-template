import * as dotenv from "dotenv";

dotenv.config();

const getRequiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return value;
};

const getOptionalEnv = (key: string): string | undefined => {
  return process.env[key];
};

export const ENV = {
  BASE_URL: getRequiredEnv("BASE_URL"),
  USERNAME: getRequiredEnv("USERNAME"),
  PASSWORD: getRequiredEnv("PASSWORD"),
  APP_ID: getRequiredEnv("APP_ID"),
  PLUGIN_ID: getRequiredEnv("PLUGIN_ID"),
  RECORD_ID_WITH_PDF: getOptionalEnv("RECORD_ID_WITH_PDF"),
  RECORD_ID_WITH_IMAGE: getOptionalEnv("RECORD_ID_WITH_IMAGE"),
  RECORD_ID_EMPTY: getOptionalEnv("RECORD_ID_EMPTY"),
} as const;

export const getTestDataConfig = () => ({
  baseUrl: ENV.BASE_URL,
  username: ENV.USERNAME,
  password: ENV.PASSWORD,
  appId: ENV.APP_ID,
});

export const shouldAutoCreateRecords = (): boolean => {
  return (
    !ENV.RECORD_ID_WITH_PDF &&
    !ENV.RECORD_ID_WITH_IMAGE &&
    !ENV.RECORD_ID_EMPTY
  );
};
