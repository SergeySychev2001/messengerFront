import { Socket } from 'socket.io-client';

type SocketStateType = {
    socket: Socket | undefined
}

type SocketIsConnected = {
    type: 'SOCKET_IS_CONNECTED',
    payload: Socket
}

type SocketIsDisconnected = {
    type: 'SOCKET_IS_DISCONNECTED'
}

type ActionType = {
    type: 'SOCKET_IS_CONNECTED' | 'SOCKET_IS_DISCONNECTED',
    payload: Socket
}

export type {
    SocketStateType,
    SocketIsConnected,
    SocketIsDisconnected,
    ActionType
}