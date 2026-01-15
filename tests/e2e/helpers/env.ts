import * as dotenv from "dotenv";

dotenv.config();

const getRequiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return value;
};

export const ENV = {
  BASE_URL: getRequiredEnv("BASE_URL"),
  USERNAME: getRequiredEnv("USERNAME"),
  PASSWORD: getRequiredEnv("PASSWORD"),
  APP_ID: getRequiredEnv("APP_ID"),
  PLUGIN_ID: getRequiredEnv("PLUGIN_ID"),
} as const;

export const getTestDataConfig = () => ({
  baseUrl: ENV.BASE_URL,
  username: ENV.USERNAME,
  password: ENV.PASSWORD,
  appId: ENV.APP_ID,
});
