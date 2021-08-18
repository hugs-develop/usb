const Client = require('socket.io-client');

describe('my awesome project', () => {
    let clientSocket;

    beforeAll((done) => {
        clientSocket = new Client(`http://localhost:${3000}`);
        clientSocket.on('connect', done);
    });

    afterAll(() => {
        clientSocket.close();
    });

    test('should work', (done) => {
        clientSocket.on('data', (arg) => {
            expect(arg.length).toBeGreaterThan(1);
            done();
        });
    });

    test('should work (with ack)', (done) => {
        clientSocket.emit('add', (arg) => {
            expect(arg).toBe('hola');
            done();
        });
    });
    test('should work (with ack)', (done) => {
        clientSocket.emit('remove', (arg) => {
            expect(arg).toBe('hola');
            done();
        });
    });
});
