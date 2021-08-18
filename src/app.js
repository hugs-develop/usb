const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const UsbService = require('./service/UsbService');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { transports: ['websocket', 'polling'] });

app.use(express.static('public'));

const usbService = new UsbService();

async function getAllItems() {
    return usbService.find();
}

function stopMonitoring() {
    usbService.stopMonitoring();
}

/**
 * @param {Socket} socket
 * @param {string} event
 * @param {object|array<object>} data
 */
function sendDataToSocket(socket, event, data) {
    console.log(`Send data on event '${event}'`);
    socket.emit(event, data);
}

io.on('connection', async (socket) => {
    const allItems = await getAllItems();

    sendDataToSocket(socket, 'data', allItems);

    usbService.usbDetect.on('add', function (device) {
        sendDataToSocket(socket, this.event, device);
    });
    usbService.usbDetect.on('remove', function (device) {
        sendDataToSocket(socket, this.event, device);
    });
});

io.on('disconnect', () => {
    console.log('disconnect');
    stopMonitoring();
});

app.get('/all', async (req, res) => {
    const allItems = await getAllItems();
    res.json(allItems);
});

server.listen(3000, () => {
    console.log('listening on localhost:3000');
});
