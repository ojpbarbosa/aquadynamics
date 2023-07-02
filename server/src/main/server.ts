import { PORT, setUpApiServer, setUpWebSocketServer } from './configuration'
import { setUpLogPostRoute } from './routes'

const apiServer = setUpApiServer()
const { httpServer, webSocketServer } = setUpWebSocketServer(apiServer)

setUpLogPostRoute(apiServer, webSocketServer)

httpServer.listen(Number(PORT) || 3030, () => {
  console.log(`Server started running on port ${PORT || 3030}!`)
})
