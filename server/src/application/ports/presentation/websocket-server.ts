export interface IWebSocketServer {
  on: (event: string, callback: () => void) => void
  emit: (event: string, data: any) => void
}
