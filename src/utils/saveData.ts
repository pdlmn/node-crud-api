import fs from 'fs/promises'

const saveData = (file: string, data: object) => {
  return fs.writeFile(file, JSON.stringify(data, null, 2))
}

export { saveData }
