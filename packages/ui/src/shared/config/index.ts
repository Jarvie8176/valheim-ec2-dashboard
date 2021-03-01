import { decodeDto } from "@ansik/sdk/lib/utils";
import { string } from "io-ts";

export const Config = {
  EC2_START_URL: decodeDto(string, process.env.REACT_APP_EC2_START_URL),
  EC2_STOP_URL: decodeDto(string, process.env.REACT_APP_EC2_STOP_URL),
  EC2_STATUS_URL: decodeDto(string, process.env.REACT_APP_EC2_STATUS_URL),
  STATUS_CHECK_URL: decodeDto(string, process.env.REACT_APP_STATUS_CHECK_URL),
  API_AUTH_TOKEN: decodeDto(string, process.env.REACT_APP_API_AUTH_TOKEN),
  GAME_SERVER_CONNECTION: decodeDto(string, process.env.REACT_APP_SERVER_CONNECTION),
  GAME_SERVER_PASSWORD: decodeDto(string, process.env.REACT_APP_SERVER_PASSWORD),
};
