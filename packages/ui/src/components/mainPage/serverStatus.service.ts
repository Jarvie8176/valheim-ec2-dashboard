import { ServerStatusDto } from "./serverStatus.dto";
import { Config } from "../../shared/config";
import axios from "axios";
import { validate } from "class-validator";
import { plainToClassFromExist } from "class-transformer";
import { get } from "lodash";

export class ServerStatusService {
  private serverStatusDto = new ServerStatusDto();

  getStatus(): ServerStatusDto {
    return this.serverStatusDto;
  }

  async syncStatus(): Promise<void> {
    console.log("refresh status");
    await this.syncHostStatus().catch((err) => {
      console.error("failed to sync host status: ", err);
      this.serverStatusDto.host = new ServerStatusDto().host;
    });
    await this.syncGameServerStatus().catch((err) => {
      console.error("failed to sync server status: ", err);
      this.serverStatusDto.server = new ServerStatusDto().server;
    });
  }

  private async syncGameServerStatus(): Promise<void> {
    const statusCheckUrl = Config.STATUS_CHECK_URL;
    const res = await axios.get(statusCheckUrl, { timeout: 10000 });
    const dto = plainToClassFromExist(this.serverStatusDto, {
      server: get(res.data, "server"),
      syncTimestamp: new Date(),
    });
    await validate(dto);
    this.serverStatusDto = dto;
  }

  private async syncHostStatus(): Promise<void> {
    const statusCheckUrl = Config.EC2_STATUS_URL;
    const res = await axios.get(statusCheckUrl, { timeout: 10000 });
    const dto = plainToClassFromExist(this.serverStatusDto, {
      host: res.data,
      syncTimestamp: new Date(),
    });
    await validate(dto);
    this.serverStatusDto = dto;
  }

  async startHost(): Promise<void> {
    const url = Config.EC2_START_URL;
    const { data } = await axios.get(url, { timeout: 10000 });
    console.log(data);
  }

  async stopHost(): Promise<void> {
    const url = Config.EC2_STOP_URL;
    const { data } = await axios.get(url, { timeout: 10000 });
    console.log(data);
  }
}

export const serverStatusService = new ServerStatusService();
