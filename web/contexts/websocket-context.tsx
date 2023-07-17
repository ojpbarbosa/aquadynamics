'use client'

import { createContext, ReactNode } from 'react'
import io from 'socket.io-client'

export const socket = io('wss://aquadynamics-core.onrender.com')
export const streaming = io('wss://aquadynamics-core.onrender.com/streaming')
export const WebSocketContext = createContext({ socket, streaming })

type WebSocketProviderProps = {
  children: ReactNode
}

export default function WebSocketProvider({ children }: WebSocketProviderProps) {
  return (
    <WebSocketContext.Provider value={{ socket, streaming }}>{children}</WebSocketContext.Provider>
  )
}
