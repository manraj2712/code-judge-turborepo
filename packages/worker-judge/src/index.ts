import express, { Express } from "express";

import cluster from "cluster";
import os from "os";
import cors from "cors";
import { processQueue } from "./worker";

require("dotenv").config();
const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const workers: { [workerPid: string]: any } = {};
const count = os.cpus().length;

function spawn() {
  const worker = cluster.fork();
  workers[worker.id] = worker;
  return worker;
}

if (cluster.isPrimary) {
  for (let i = 0; i < count; i++) {
    spawn();
  }
  cluster.on("death", function (worker: any) {
    console.log("worker " + worker.pid + " died. spawning a new process...");
    delete workers[worker.pid];
    spawn();
  });
  const app = express();
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
} else {
  (async () => {
    const x = 0;
    while (x < 1) {
      // Run always
      await processQueue();
    }
  })();
}

process.on("uncaughtException", function (err) {
  console.log("Caught exception: " + err);
});
