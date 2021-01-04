import { io, Socket } from 'socket.io-client'

const syncUrl = process.env.SYNC_URL || ''

let socket = undefined as Socket | undefined

export function createSocket(): Socket {
  socket = io(syncUrl)
  return socket
}

export function clearSocket(): void {
  socket = undefined
}

export function getSocket(): Socket | undefined {
  return socket
}
