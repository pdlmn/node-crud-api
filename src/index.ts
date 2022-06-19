import http from 'http'
import { sendUsers } from './controllers/users'

const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  if (req.url === '/users' && req.method === 'GET') {
    sendUsers(res)
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ message: 'Route not found' }))
  }
})

server.listen(port, () => console.log(`Server runs on ${port} port.`))
