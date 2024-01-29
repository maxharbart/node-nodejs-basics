import fs from "fs";
import zlib from "zlib";
import { pipeline } from "stream";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
  const compressedFile = path.join(__dirname, "files", "archive.gz");
  const outputFile = path.join(
    __dirname,
    "files",
    "fileToCompress.txt"
  );

  const readStream = fs.createReadStream(compressedFile);
  const writeStream = fs.createWriteStream(outputFile);
  const gunzip = zlib.createGunzip();

  await new Promise((resolve, reject) => {
    pipeline(readStream, gunzip, writeStream, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  console.log("File decompressed successfully.");
};

await decompress();
