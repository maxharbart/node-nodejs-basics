import { fileURLToPath } from "url";
import fs from "fs/promises";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
  const filePath = path.join(__dirname, "files", "fileToRemove.txt");

  try {
    await fs.access(filePath);

    await fs.unlink(filePath);

    console.log("File removed successfully.");
  } catch (error) {
    throw new Error("FS operation failed: fileToRemove.txt does not exist.");
  }
};

await remove();
