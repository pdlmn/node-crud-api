import path from 'path'

const filename = process.argv[1]
const dirname = path.dirname(filename)

export { filename, dirname }
