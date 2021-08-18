const socket = io('http://localhost:3000');
socket.on('connect', () => console.log('socket connect'));
socket.on('connect_error', (error) => console.log('socket connect_error', error));
socket.on('data', (devices) => drewAllItems(devices));
socket.on('add', (device) => addItemToChart(device));
socket.on('remove', (device) => removeItemFromChart(device));
socket.on('disconnect', () => console.log('disconnect'));
