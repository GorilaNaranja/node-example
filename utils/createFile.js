const fs = require("fs");

let createFile = async data => {
  return new Promise((resolve, reject) => {
    if (!data) return reject("Empty data");

    fs.writeFile("temp/employees.txt", JSON.stringify(data), async error => {
      if (error) reject(error);
      resolve("File saved");
    });
  });
};

module.exports = { createFile };
