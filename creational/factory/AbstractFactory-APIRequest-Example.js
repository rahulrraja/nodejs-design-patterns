const net = require('net');
const http = require('http');

// Abstract class ApiRequest
class ApiRequest {
    makeGetRequest(url) {
        return Error(`Implement makeGetRequest for ${url}`)
    }
}

// TcpApiRequest class
class TcpApiRequest extends ApiRequest {
    makeGetRequest(url) {
        // Handling simple get request without query params

        return new Promise((resolve, reject) => {
            console.log("Using TCP Request");

            const socket = net.createConnection({
                host: 'www.example.com',
                port: '80'
            })

            socket.on('data', data => resolve(data.toString()));

            socket.on('error', err => reject(err));

            socket.end(`GET / HTTP/1.1\r\nHost: ${url}\r\n\r\n`);
        });
    }
}

// HttpApiRequest class
class HttpApiRequest extends ApiRequest {
    makeGetRequest(url) {
        // Handling simple get request without query params

        return new Promise((resolve, reject) => {
            console.log('Using HTTP Request');

            http.request(`http://${url}`, (res) => {
                res.on('data', data => resolve(data.toString()));
                res.on('error', err => reject(err));
            }).end();
        })
    }
}

/**
 * This is an abstract factory interface. Uses a static function to
 * generate type of api request
 */
class ApiRequestFactory {
    static createApiRequest(kind) {
        switch (kind) {
            case "tcp":
                return new TcpApiRequest();
            case "http":
                return new HttpApiRequest();
        }
    }
}

const availableOptions = ['tcp', 'http'];
const apiRequest = ApiRequestFactory.createApiRequest(availableOptions[Math.floor(Math.random() * 2)])

apiRequest.makeGetRequest("example.com")
    .then(response => console.log(response))
    .catch(err => console.log(err))

module.exports = ApiRequestFactory;    