import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
  const filePath = path.join(__dirname, "files", "fresh.txt");
  const content = "I am fresh and young";

  fs.access(filePath, (err) => {
    if (!err) {
      throw new Error("FS operation failed: File already exists");
    } else {
      fs.writeFile(filePath, content, (err) => {
        if (err) {
          throw err;
        }
        console.log("File created successfully.");
      });
    }
  });
};

await create();
