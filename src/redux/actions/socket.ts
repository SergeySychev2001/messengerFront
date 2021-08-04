import { Socket } from 'socket.io-client';
import { SocketIsConnected, SocketIsDisconnected } from '../types/socket';

const socketIsConnected = (payload: Socket): SocketIsConnected => {
    return{
        type: 'SOCKET_IS_CONNECTED',
        payload
    }
}

const socketIsDisconnected = (): SocketIsDisconnected => {
    return{
        type: 'SOCKET_IS_DISCONNECTED'
    }
}

export {
    socketIsConnected,
    socketIsDisconnected
}