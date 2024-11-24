import fs from "fs/promises";

const FILE_PATH = "expenses.json";

export const readFile = async () => {
  const data = await fs.readFile(FILE_PATH, "utf-8");
  return JSON.parse(data);
};

export const writeFile = async (data) => {    
  await fs.writeFile(FILE_PATH, data);
};
