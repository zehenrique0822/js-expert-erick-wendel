const { readFile } = require('fs/promises')
const { error } = require('./constants')
const DEFAULT_OPTION = {
  maxLine: 3,
  fields: ['id','name','profession','age']
}

class File {
  static async csvToJson(filePath) {
    const content = await readFile(filePath, "utf8")
    const validation = this.isValid(content)
    if (!validation.valid) throw new Error(validation.error)
    
    const result = this.parseCSVToJSON(content)
    return result
  }

  static isValid(csvString, options = DEFAULT_OPTION) {
    // Para ver o conteudo do arquivo
    // node depois  fs.readFileSync('./mocks/three-items-valid.csv', 'utf8')
    // [0] = headers
    // [1] = linha 1
    // [2] = linha 2
    // ...variavel = restante do arquivo
    const [header, ...fileWithoutHeader] = csvString.split(/\r?\n/)
    const isHeaderValid = header === options.fields.join(',')
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELD_ERROR_MESSAGE,
        valid: false
      }
    }

    if (!fileWithoutHeader.length || 
      fileWithoutHeader.length > options.maxLine) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }
    return { valid: true }
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split(/\r?\n/)
    // remover a primeira linha (header)
    const firstLine = lines.shift()
    const header = firstLine.split(',')

    const users = lines.map(line => {
      const colums = line.split(',')
      let user = {}
      for (const index in colums) {
        user[header[index]] = colums[index].trim()
      }
      return user
    })
    return users
  }
}

module.exports = File