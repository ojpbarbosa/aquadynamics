'use client'

import { createContext, ReactNode } from 'react'
import io from 'socket.io-client'

import { CORE_URL } from '@/library/api'

export const socket = io('wss://' + CORE_URL)
export const streaming = io('wss://' + CORE_URL + '/streaming')
export const WebSocketContext = createContext({ socket, streaming })

type WebSocketProviderProps = {
  children: ReactNode
}

export default function WebSocketProvider({ children }: WebSocketProviderProps) {
  return (
    <WebSocketContext.Provider value={{ socket, streaming }}>{children}</WebSocketContext.Provider>
  )
}
