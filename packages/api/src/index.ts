import Bluebird from "bluebird";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import AWS from "aws-sdk";

const app = express();
app.use(helmet());
app.use(cors());

const port = process.env.API_PORT;
const instanceId = <string>process.env.INSTANCE_ID;

app.get("/api/server/start", (_req, res) => {
  Bluebird.try(async () => {
    const ec2 = new AWS.EC2({ region: "us-east-1" });
    const apiResult = await ec2
      .startInstances({
        InstanceIds: [instanceId],
      })
      .promise();
    console.log(apiResult);
    res.json({
      message: "success",
    });
  }).catch((err) => {
    console.error(err.stack);
    res.status(500);
    res.json({
      message: err.message,
    });
  });
});

app.get("/api/server/stop", (_req, res) => {
  Bluebird.try(async () => {
    const ec2 = new AWS.EC2({ region: "us-east-1" });
    const apiResult = await ec2
      .stopInstances({
        InstanceIds: [instanceId],
      })
      .promise();
    console.log(apiResult);
    res.json({
      message: "success",
    });
  }).catch((err) => {
    console.error(err.stack);
    res.status(500);
    res.json({
      message: err.message,
    });
  });
});

app.get("/api/server/status", (_req, res) => {
  Bluebird.try(async () => {
    const ec2 = new AWS.EC2({ region: "us-east-1" });
    const apiResult = await ec2
      .describeInstanceStatus({
        IncludeAllInstances: true,
        InstanceIds: [instanceId],
      })
      .promise();
    console.log(apiResult);
    const instanceData = apiResult?.InstanceStatuses?.[0];
    const instanceStatus = instanceData?.InstanceState?.Name;
    res.json({
      status: instanceStatus,
    });
  }).catch((err) => {
    console.error(err.stack);
    res.status(500);
    res.json({
      message: err.message,
    });
  });
});

((): void => {
  app.listen(port, () => {
    console.log(`server listening on ${port}`);
  });
})();
