import { fileURLToPath } from "url";
import fs from "fs/promises";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
  const filesFolder = path.join(__dirname, "files");
  const sourceFilename = path.join(filesFolder, "wrongFilename.txt");
  const targetFilename = path.join(filesFolder, "properFilename.md");

  try {
    await fs.access(sourceFilename);

    try {
      await fs.access(targetFilename);
      throw new Error("Target file already exists");
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    await fs.rename(sourceFilename, targetFilename);

    console.log(
      `File "${sourceFilename}" renamed to "${targetFilename}" successfully.`
    );
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error("Source file does not exist");
    } else {
      throw new Error("FS operation failed: " + error.message);
    }
  }
};

await rename();
