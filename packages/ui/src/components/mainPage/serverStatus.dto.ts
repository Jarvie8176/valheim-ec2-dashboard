import { IsInt } from "class-validator";

export class ServerStatusDto {
  host?: Host;
  server?: Server;
  serverUp?: boolean;
  syncTimestamp?: Date;
}

class Host {
  status = "N/A";
}

class Server {
  name = "";

  version = "";

  @IsInt()
  players = NaN;

  @IsInt()
  max_players = NaN;

  map = "";
}
