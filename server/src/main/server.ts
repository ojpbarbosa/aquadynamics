import { PORT, setUpServer, setUpWebSocket } from './configuration'

const server = setUpWebSocket(setUpServer())

const port = PORT || 3030

server.listen(port, () => {
  console.log(`Server started running on port ${port}!`)
})
