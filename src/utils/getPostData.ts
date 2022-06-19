import { IncomingMessage } from "http"

const getPostData = (req: IncomingMessage): Promise<string> => new Promise((resolve, reject) => {
  try {
    let body = ''

    req.on('data', (chunk: Buffer) => {
      body += chunk.toString()
    })

    req.on('end', async () => {
      resolve(body)
    })
  } catch(err) {
    console.log(err)
  }
})

export { getPostData }
