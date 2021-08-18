const io = require('socket.io-client');

const socketUrl = 'http://localhost:3000';

function client() {
    const socket = io(socketUrl, { secure: true, reconnection: true, rejectUnauthorized: false });

    socket.on('connect', () => {
        console.log('socket connect');
    });

    socket.on('connect_error', (error) => {
        console.log('socket connect_error', error);
    });

    socket.on('data', (device) => {
        console.log(device);
    });

    socket.on('add', (device) => {
        console.log(device);
    });

    socket.on('remove', (device) => {
        console.log(device);
    });
    socket.on('disconnect', () => {
        console.log('disconnect');
    });
}

client();
