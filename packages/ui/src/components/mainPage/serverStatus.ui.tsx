import { Fragment, FunctionComponent } from "react";
import { ServerStatusDto } from "./serverStatus.dto";
import { Grid } from "@material-ui/core";
import { InfoCard } from "./infoCard.ui";
import { isNil } from "lodash";

type Props = {
  serverStatus: ServerStatusDto;
};

export const ServerStatusUi: FunctionComponent<Props> = (props) => {
  const activePlayerCount = props.serverStatus.server?.players;
  const maxPlayerCount = props.serverStatus.server?.max_players;
  const playerCountMessage = !isNil(activePlayerCount) ? `${activePlayerCount}/${maxPlayerCount}` : "N/A";
  const syncTimestamp = props.serverStatus.syncTimestamp?.toString() || "N/A";
  const hostStatusMessage = props.serverStatus.host?.status || "N/A";
  const serverStatusMessage = props.serverStatus.server ? "Running" : "Stopped";

  console.log(props.serverStatus);

  return (
    <Fragment>
      <Grid item>
        <InfoCard title={"Host Status"} content={hostStatusMessage} />
      </Grid>
      <Grid item>
        <InfoCard title={"Server Status"} content={serverStatusMessage} />
      </Grid>
      <Grid item>
        <InfoCard title={"Players Online"} content={playerCountMessage} />
      </Grid>
      <Grid item>
        <InfoCard title={"Synced At"} content={syncTimestamp} />
      </Grid>
    </Fragment>
  );
};
