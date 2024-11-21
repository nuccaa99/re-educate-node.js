import fs from "fs/promises";

export const readFile = async (filePath, parsed) => {
  const data = await fs.readFile(filePath, "utf-8");
  return parsed ? data : JSON.parse(data);
};

export const writeFile = async (filePath, data) => {
  await fs.writeFile(filePath, data);
};
