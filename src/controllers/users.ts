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

const sendUser = async (res: ServerResponse, id: number) => {
  try {
    const user = await UserModel.get(id)

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'User not found' }) + '\n')
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(user, null, 2) + '\n')
    }
  } catch(err) {
    console.log(err)
  }
}

const removeUser = async (res: ServerResponse, id: number) => {
  try {
    const user = await UserModel.get(id)

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'User not found' }, null, 2) + '\n')
    } else {
      await UserModel.remove(id)
      res.writeHead(204, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: `User ${id} was deleted` }, null, 2) + '\n')
    }
  } catch(err) {
    console.log(err)
  }
}

export { sendUsers, sendUser, removeUser }
