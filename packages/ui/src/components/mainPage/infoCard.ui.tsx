import { FunctionComponent } from "react";
import { Card, CardContent, CardProps, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(1),
    height: 220,
    width: 220,
  },
}));

type Props = CardProps & {
  title: string;
  content: string;
};

export const InfoCard: FunctionComponent<Props> = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5" component="p" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="h6" component="p">
          {props.content}
        </Typography>
      </CardContent>
    </Card>
  );
};
