'use client'

import { createContext, ReactNode } from 'react'
import io from 'socket.io-client'

export const socket = io('https://aquadynamics-core.onrender.com', { path: '/ws' })
export const WebSocketContext = createContext({ socket })

type WebSocketProviderProps = {
  children: ReactNode
}

export default function WebSocketProvider({ children }: WebSocketProviderProps) {
  return <WebSocketContext.Provider value={{ socket }}>{children}</WebSocketContext.Provider>
}
