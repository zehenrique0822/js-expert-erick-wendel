const { error } = require ('./src/constants')
const File = require ('./src/file')
const assert = require('assert')

// IFEE
;(async () => {
  // variaveis criadas nesse bloco só são validas durante a execução
  {
    const filePath = './mocks/empty-file-invalid.csv'
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await assert.rejects(result, expected)
  }

  {
    const filePath = './mocks/invalid-header.csv'
    const expected = new Error(error.FILE_FIELD_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await assert.rejects(result, expected)
  }

  {
    const filePath = './mocks/five-items-invalid.csv'
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await assert.rejects(result, expected)
  }

  {
    const filePath = './mocks/three-items-valid.csv'
    const expected = [
      {
        id: 1,
        name: "xuxa da silva",
        profession: "developer",
        age: "120"
      },
      {
        id: 2,
        name: "jose da silva",
        profession: "manager",
        age: "30"
      },
      {
        id: 3,
        name: "zezin",
        profession: "qa",
        age: "25"
      },
    ]
    const result = await File.csvToJson(filePath)
    assert.deepEqual(result, expected)
  }

})()