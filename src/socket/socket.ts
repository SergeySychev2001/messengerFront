import { io, Socket } from 'socket.io-client';

const startSocket = (): Socket => {
    const socket = io('http://localhost:4000');
    socket.on('connect', () => {
        socket.emit('userIsConnected', sessionStorage.getItem('userId'));
    });
    return socket;
}

export default startSocket;