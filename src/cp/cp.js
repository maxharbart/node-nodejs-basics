import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args) => {
  const childProcess = spawn(
    "node",
    [path.join(__dirname, "files", "script.js"), ...args],
    {
      stdio: ["pipe", "pipe", process.stderr],
    }
  );

  process.stdin.pipe(childProcess.stdin);

  childProcess.stdout.on("data", (data) => {
    process.stdout.write(data);
  });

  childProcess.on("exit", (code, signal) => {
    if (code !== null) {
      console.log(`Child process exited with code ${code}`);
    } else if (signal !== null) {
      console.error(`Child process was killed with signal ${signal}`);
    }
  });

  return childProcess;
};

spawnChildProcess(["arg1", "arg2"]);
