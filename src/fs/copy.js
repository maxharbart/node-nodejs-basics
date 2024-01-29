import fs from "fs/promises";
import path from "path";

const copy = async () => {
  const sourceDir = "files";
  const destinationDir = "files_copy";

  try {
    await fs.access(sourceDir);

    try {
      await fs.access(destinationDir);
      throw new Error(
        "FS operation failed: Destination directory already exists"
      );
    } catch (err) {
      if (err.code !== "ENOENT") {
        throw err;
      }
    }

    await fs.mkdir(destinationDir);

    const files = await fs.readdir(sourceDir);

    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const destinationPath = path.join(destinationDir, file);
      await fs.copyFile(sourcePath, destinationPath);
    }

    console.log("Files copied successfully.");
  } catch (err) {
    throw err;
  }
};

await copy();
