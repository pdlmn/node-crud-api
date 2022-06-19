import fs from 'fs/promises'
import path from 'path'
import { dirname } from '../utils/filename';
import { User } from '../types'

let users: User[];
fs.readFile(path.join(dirname, '../data/users.json'))
  .then(buff => buff.toString())
  .then(str => users = JSON.parse(str))

const UserModel = (() => {

  const getAll = async () => users
  
  return {
    getAll
  }
})()

export { UserModel }
