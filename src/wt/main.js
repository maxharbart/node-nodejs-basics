import {
  Worker,
  isMainThread,
  parentPort,
  workerData,
  threadId,
} from "worker_threads";
import os from "os";

const numCores = os.cpus().length;

const workerScript = "./worker.js";

const performCalculations = async () => {
  if (isMainThread) {
    const results = [];
    const promises = [];

    for (let i = 0; i < numCores; i++) {
      const worker = new Worker(workerScript, { workerData: i + 10 });

      const promise = new Promise((resolve, reject) => {
        worker.on("message", (message) => {
          results.push({ status: "resolved", data: message });
          resolve();
        });

        worker.on("error", (error) => {
          results.push({ status: "error", data: null });
          reject(error);
        });
      });

      promises.push(promise);
    }

    await Promise.all(promises);

    console.log(results);
  }
};

await performCalculations();
