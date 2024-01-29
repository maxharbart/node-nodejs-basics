import fs from "fs";
import crypto from "crypto";

const calculateHash = async () => {
  const fileStream = fs.createReadStream("./files/fileToCalculateHashFor.txt");
  const hash = crypto.createHash("sha256");

  await new Promise((resolve, reject) => {
    fileStream.on("data", (data) => {
      hash.update(data);
    });

    fileStream.on("end", () => {
      const calculatedHash = hash.digest("hex");
      console.log("SHA256 Hash:", calculatedHash);
      resolve();
    });

    fileStream.on("error", (error) => {
      reject(error);
    });
  });
};

await calculateHash();
