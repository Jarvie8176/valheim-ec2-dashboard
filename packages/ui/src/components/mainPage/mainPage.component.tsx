import { MainPageUi } from "./mainPage.ui";
import { FunctionComponent, useEffect, useState } from "react";
import { serverStatusService } from "./serverStatus.service";
import { Config } from "../../shared/config";
import { cloneDeep } from "lodash";
import { onError } from "../../shared/errorHandler";

export const MainPageComponent: FunctionComponent = () => {
  const [serverStatus, setServerStatus] = useState(serverStatusService.getStatus());

  const { GAME_SERVER_CONNECTION, GAME_SERVER_PASSWORD } = Config;

  useEffect(() => {
    console.log("loading data");
    handleUpdateServerStatus().catch(onError);
  }, []);

  const handleUpdateServerStatus = async () => {
    await serverStatusService.syncStatus();
    console.log("update UI");
    setServerStatus(cloneDeep(serverStatusService.getStatus())); // todo: make it immutable in a proper way
  };

  const handleStartHost = async () => {
    console.log("start host");
    await serverStatusService.startHost();
    await handleUpdateServerStatus().catch(onError);
  };

  const handleStopHost = async () => {
    console.log("stop host");
    await serverStatusService.stopHost();
    await handleUpdateServerStatus().catch(onError);
  };

  return (
    <MainPageUi
      serverStatus={serverStatus}
      onServerStatusUpdateClicked={handleUpdateServerStatus}
      onHostStartClicked={handleStartHost}
      onHostStopClicked={handleStopHost}
      serverIp={GAME_SERVER_CONNECTION}
      serverPassword={GAME_SERVER_PASSWORD}
    />
  );
};
