import http from 'http'
const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  console.log('heh')
})

server.listen(port, () => console.log(`Server runs on ${port} port.`))
