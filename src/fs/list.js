import { fileURLToPath } from "url";
import fs from "fs/promises";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
  try {
    const filesDir = path.join(__dirname, "files");
    const filenames = await fs.readdir(filesDir);
    console.log("Files in 'files' folder:");
    filenames.forEach((filename) => {
      console.log(filename);
    });
  } catch (err) {
    throw new Error("FS operation failed: " + err.message);
  }
};

await list();
