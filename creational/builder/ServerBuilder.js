const net = require('net');

/**
 * Outline of Basic Server
 */
class Server {
    setHostName(){}
    setPortNumber() {}
    setOnConnection() {}
    listen() {}
}

/**
 * Server builder is implementing the server
 * using the net. New builder can easily be made to
 * use server like express etc
 */

class ServerBuilder extends Server {
    constructor() {
        super()
        this._server = null;
        this._hostname = "localhost";
        this._port = 8080;
        this._isHalfOpenedSocketAllowed = false;
        this._isPauseOnConnect = false;
        this._onConnectionCb = () => {}
    }

    setHostName(hostName) {
        this._hostname = hostName;
        return this;
    }

    setPortNumber(port) {
        this._port = port
        return this;
    }

    setOnConnection(callback) {
        this._onConnectionCb = callback;
        return this;
    }

    setHalfOpenedSocketAllowed() {
        this._isHalfOpenedSocketAllowed = true;
        return this;
    }

    setPauseOnConnect() {
        this._isPauseOnConnect = true;
        return this;
    }

    listen(callback) {
        this._server = net.createServer({
            allowHalfOpen: this._isHalfOpenedSocketAllowed,
            pauseOnConnect: this._isPauseOnConnect
        });

        this._server.on('connection', this._onConnectionCb);
        this._server.listen(this._port, this._hostname, callback)

        return this;
    }
}

let serverBuilder = new ServerBuilder();

serverBuilder.setHostName('localhost').setPortNumber(8080).listen(() => console.log('Server Started'));