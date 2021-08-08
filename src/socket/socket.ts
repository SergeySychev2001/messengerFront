import { io, Socket } from 'socket.io-client';

const startSocket = (): Socket => {
    const socket = io('http://localhost:4000', {
        extraHeaders: {
            'userId': `${sessionStorage.getItem('userId')}`
        }
    });
    return socket;
}

export default startSocket;