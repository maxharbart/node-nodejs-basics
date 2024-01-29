import fs from "fs";
import zlib from "zlib";
import { pipeline } from "stream";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
  const fileToCompress = path.join(__dirname, "files", "fileToCompress.txt");
  const outputFile = path.join(__dirname, "files", "archive.gz");

  const readStream = fs.createReadStream(fileToCompress);
  const writeStream = fs.createWriteStream(outputFile);
  const gzip = zlib.createGzip();

  await new Promise((resolve, reject) => {
    pipeline(readStream, gzip, writeStream, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  console.log("File compressed successfully.");
};

await compress();
