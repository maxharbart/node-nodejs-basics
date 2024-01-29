import fs from "fs";

const read = async () => {
  const filePath = "./files/fileToRead.txt";

  const readStream = fs.createReadStream(filePath);

  readStream.on("data", (chunk) => {
    process.stdout.write(chunk);
  });

  readStream.on("error", (err) => {
    console.error("Error reading file:", err);
  });

  readStream.on("end", () => {
    console.log("File reading completed.");
  });
};

await read();
