import fs from "fs/promises";

const readFile = async (filePath, parsed) => {
  const data = await fs.readFile(filePath, "utf-8");
  return parsed ? JSON.parse(data) : data;
};

const writeFile = async (filePath, data) => {
  await fs.writeFile(filePath, data);
  console.log("written successfully");
};

export { readFile, writeFile };
