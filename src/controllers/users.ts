import { IncomingMessage, ServerResponse } from 'http'
import { UserModel } from '../models/User'

const sendUsers = async (res: ServerResponse) => {
  try {
    const users = await UserModel.getAll()
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(users, null, 2) + '\n')
  } catch(err) {
    console.log(err)
  }
}

export { sendUsers }
