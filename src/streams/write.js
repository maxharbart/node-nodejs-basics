import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
  const filePath = path.join(__dirname, "files", "fileToWrite.txt");
  const writableStream = fs.createWriteStream(filePath);

  process.stdin.pipe(writableStream);

  writableStream.on("error", (err) => {
    console.error("Error occurred while writing:", err);
  });

  writableStream.on("finish", () => {
    console.log("Data has been written to fileToWrite.txt");
  });
};

await write();
