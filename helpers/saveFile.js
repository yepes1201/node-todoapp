const fs = require("fs");

const path = "./db/data.json";

const saveDB = (data) => {
  fs.writeFileSync(path, JSON.stringify(data));
};

const readDB = () => {
  if (!fs.existsSync(path)) return null;
  const resp = fs.readFileSync(path, { encoding: "utf-8" });
  return JSON.parse(resp);
};

module.exports = {
  saveDB,
  readDB,
};
