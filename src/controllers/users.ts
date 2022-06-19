import { IncomingMessage, ServerResponse } from 'http'
import { UserModel } from '../models/User'
import { getPostData } from '../utils/getPostData'
import { User } from '../types'

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

const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const user = await getPostData(req)
    if (!user) {
      res.writeHead(400)
      res.end(JSON.stringify({ message: 'Empty request body' }, null, 2))
      return
    }
    const { id, username, age, hobbies }: any = await UserModel.create(JSON.parse(user))
    const newUser: User = {
      id,
      username,
      age,
      hobbies
    }
    res.writeHead(201, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(newUser, null, 2) + '\n')
  } catch(err) {
    console.log(err)
  }
}

const updateUser = async (req: IncomingMessage, res: ServerResponse, id: number) => {
  try {
    const user = await UserModel.get(id)

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ message: 'User not found' }))
    } else {
      const body = await getPostData(req)
      const { username, age, hobbies }: User = JSON.parse(body)
      const userData = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies
      }

      const updUser = await UserModel.update(id, userData)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(updUser, null, 2) + '\n')
    }
  } catch(err) {
    console.log(err)
  }
}

export { sendUsers, sendUser, updateUser, removeUser, createUser }
