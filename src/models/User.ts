import fs from 'fs/promises'
import path from 'path'
import { dirname } from '../utils/filename';
import { User } from '../types'
import { saveData } from '../utils/saveData';

const usersJsonPath = path.join(process.argv[1], '../../data/users.json')
let users: User[];
fs.readFile(path.join(dirname, '../data/users.json'))
  .then(buff => buff.toString())
  .then(str => users = JSON.parse(str))

const UserModel = (() => {

  const getAll = async () => users

  const get = async (id: number) => {
    const user = users.find(u => u.id === id)
    return user
  }

  const remove = async (id: number) => {
    const idx = users.findIndex(u => u.id === id)
    users.splice(idx, 1)
    await saveData(usersJsonPath, users)
    return
  }
  
  return {
    getAll,
    get,
    remove
  }
})()

export { UserModel }
