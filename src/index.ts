import http from 'http'
import { sendUsers, sendUser, removeUser } from './controllers/users'

const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  if (req.url === '/users' && req.method === 'GET') {
    sendUsers(res)
  } else if (req.url?.match(/\/users\/([0-9]+)/) && req.method === 'GET') {
    const id = +req.url?.split('/')[2]
    sendUser(res, id)
  } else if (req.url?.match(/\/users\/([0-9]+)/) && req.method === 'DELETE') {
    const id = +req.url?.split('/')[2]
    removeUser(res, id)
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Route not found' }))
  }
})

server.listen(port, () => console.log(`Server runs on ${port} port.`))
