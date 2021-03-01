import { Fragment, FunctionComponent } from "react";
// import styled from "styled-components";
import { ServerStatusDto } from "./serverStatus.dto";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { ServerStatusUi } from "./serverStatus.ui";

type Props = {
  serverStatus: ServerStatusDto;
  onServerStatusUpdateClicked: () => unknown;
  onHostStartClicked: () => unknown;
  onHostStopClicked: () => unknown;
  serverIp: string;
  serverPassword: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "sm",
    padding: theme.spacing(9),
  },
  grid: {
    justify: "center",
    alignItems: "center",
    paddingBottom: theme.spacing(5),
  },
  controlGridItem: {
    justify: "center",
    alignItems: "center",
  },
}));

export const MainPageUi: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.root}>
        <Grid className={classes.grid} container spacing={3}>
          <Grid item>
            <Button variant="contained" onClick={props.onServerStatusUpdateClicked}>
              refresh
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={props.onHostStartClicked}>
              start
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={props.onHostStopClicked}>
              stop
            </Button>
          </Grid>
        </Grid>
        <Grid className={classes.grid} container spacing={3}>
          <div>
            <Typography>{`server IP: ${props.serverIp}`}</Typography>
            <Typography>{`server password: ${props.serverPassword}`}</Typography>
          </div>
        </Grid>
        <Grid className={classes.grid} container spacing={3}>
          <ServerStatusUi serverStatus={props.serverStatus} />
        </Grid>
      </div>
    </Fragment>
  );
};
