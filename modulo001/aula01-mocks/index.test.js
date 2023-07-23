const { error } = require("./src/constants");
const File = require("./src/file");
const assert = require("assert");

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expected);
  }
  {
    const filePath = "./mocks/invalid-header.csv";
    const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expected);
  }
  {
    const filePath = "./mocks/fiveItems-invalid.csv";
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);
    await assert.rejects(result, expected);
  }
  {
    const filePath = "./mocks/threeItems-valid.csv";
    const expected = [
      {
        id: 1,
        name: "xuxa da silva",
        profession: "developer",
        age: 22,
      },
      {
        id: 2,
        name: "jose da silva",
        profession: "developer",
        age: 33,
      },
      {
        id: 3,
        name: "claudio correia",
        profession: "developer",
        age: 44,
      },
    ];
    const result = await File.csvToJson(filePath);
    assert.deepEqual(result, expected);
  }
})();
